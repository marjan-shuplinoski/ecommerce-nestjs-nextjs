import { Test, TestingModule } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { RolesGuard } from './roles.guard';
import { NotificationService } from '../../../shared/notification';
import { UserRole } from '../../user/schemas/user.schema';
import { ROLES_KEY } from '../decorators/roles.decorator';

interface MockUser {
  id: string;
  email: string;
  role?: UserRole;
}

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: Reflector;
  let notificationService: NotificationService;

  const mockExecutionContext = (user?: MockUser): ExecutionContext =>
    ({
      switchToHttp: () => ({
        getRequest: () => ({ user }),
      }),
      getHandler: jest.fn(),
      getClass: jest.fn(),
    }) as unknown as ExecutionContext;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesGuard,
        {
          provide: Reflector,
          useValue: {
            getAllAndOverride: jest.fn(),
          },
        },
        {
          provide: NotificationService,
          useValue: {
            notifyError: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<RolesGuard>(RolesGuard);
    reflector = module.get<Reflector>(Reflector);
    notificationService = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should allow access when no roles are required', () => {
      const getAllAndOverrideSpy = jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(null);
      const context = mockExecutionContext();

      const result = guard.canActivate(context);

      expect(result).toBe(true);
      expect(getAllAndOverrideSpy).toHaveBeenCalledWith(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
    });

    it('should allow access when user has required role', () => {
      const user = { id: '1', email: 'test@example.com', role: UserRole.ADMIN };
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([UserRole.ADMIN]);
      const context = mockExecutionContext(user);

      const result = guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should allow access when user has one of multiple required roles', () => {
      const user = { id: '1', email: 'test@example.com', role: UserRole.SELLER };
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([UserRole.ADMIN, UserRole.SELLER]);
      const context = mockExecutionContext(user);

      const result = guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should throw ForbiddenException when user is not authenticated', () => {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([UserRole.ADMIN]);
      const notifyErrorSpy = jest.spyOn(notificationService, 'notifyError').mockReturnValue({
        type: 'error',
        message: 'User not authenticated.',
        code: 'USER_NOT_AUTHENTICATED',
      });
      const context = mockExecutionContext();

      expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
      expect(notifyErrorSpy).toHaveBeenCalledWith(
        'User not authenticated.',
        'USER_NOT_AUTHENTICATED',
      );
    });

    it('should throw ForbiddenException when user does not have required role', () => {
      const user = { id: '1', email: 'test@example.com', role: UserRole.CUSTOMER };
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([UserRole.ADMIN]);
      const notifyErrorSpy = jest.spyOn(notificationService, 'notifyError').mockReturnValue({
        type: 'error',
        message: 'Access denied. Required roles: admin. Your role: customer.',
        code: 'INSUFFICIENT_PERMISSIONS',
      });
      const context = mockExecutionContext(user);

      expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
      expect(notifyErrorSpy).toHaveBeenCalledWith(
        'Access denied. Required roles: admin. Your role: customer.',
        'INSUFFICIENT_PERMISSIONS',
      );
    });

    it('should handle empty roles array', () => {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([]);
      const context = mockExecutionContext();

      const result = guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should handle user without role property', () => {
      const user = { id: '1', email: 'test@example.com' };
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([UserRole.ADMIN]);
      const notifyErrorSpy = jest.spyOn(notificationService, 'notifyError').mockReturnValue({
        type: 'error',
        message: 'Access denied. Required roles: admin. Your role: none.',
        code: 'INSUFFICIENT_PERMISSIONS',
      });
      const context = mockExecutionContext(user);

      expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
      expect(notifyErrorSpy).toHaveBeenCalledWith(
        'Access denied. Required roles: admin. Your role: none.',
        'INSUFFICIENT_PERMISSIONS',
      );
    });
  });
});
