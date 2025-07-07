import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { NotificationService } from '../../../shared/notification';

interface MockUser {
  id: string;
  email: string;
  role?: string;
}

interface ExceptionResponse {
  message: string;
  notification: any;
  statusCode: number;
}

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  let notificationService: NotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtAuthGuard,
        {
          provide: NotificationService,
          useValue: {
            notifyError: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<JwtAuthGuard>(JwtAuthGuard);
    notificationService = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('handleRequest', () => {
    it('should return user when valid user is provided', () => {
      const user: MockUser = { id: '1', email: 'test@example.com', role: 'customer' };

      const result = guard.handleRequest<MockUser>(null, user);

      expect(result).toEqual(user);
    });

    it('should throw UnauthorizedException when no user is provided', () => {
      const notifyErrorSpy = jest.spyOn(notificationService, 'notifyError').mockReturnValue({
        type: 'error',
        message: 'Authentication required. Please provide a valid access token.',
        code: 'AUTH_REQUIRED',
      });

      expect(() => guard.handleRequest<MockUser>(null, null)).toThrow(UnauthorizedException);
      expect(notifyErrorSpy).toHaveBeenCalledWith(
        'Authentication required. Please provide a valid access token.',
        'AUTH_REQUIRED',
      );
    });

    it('should throw UnauthorizedException when error is provided', () => {
      const error = new Error('Invalid token');
      const user: MockUser = { id: '1', email: 'test@example.com' };
      const notifyErrorSpy = jest.spyOn(notificationService, 'notifyError').mockReturnValue({
        type: 'error',
        message: 'Authentication required. Please provide a valid access token.',
        code: 'AUTH_REQUIRED',
      });

      expect(() => guard.handleRequest<MockUser>(error, user)).toThrow(UnauthorizedException);
      expect(notifyErrorSpy).toHaveBeenCalledWith(
        'Authentication required. Please provide a valid access token.',
        'AUTH_REQUIRED',
      );
    });

    it('should include notification in exception', () => {
      const notification = {
        type: 'error' as const,
        message: 'Authentication required. Please provide a valid access token.',
        code: 'AUTH_REQUIRED',
      };
      jest.spyOn(notificationService, 'notifyError').mockReturnValue(notification);

      try {
        guard.handleRequest(null, null);
      } catch (error) {
        if (error instanceof UnauthorizedException) {
          const response = error.getResponse() as ExceptionResponse;
          expect(response.notification).toEqual(notification);
          expect(response.message).toBe('Authentication required');
          expect(response.statusCode).toBe(401);
        }
      }
    });
  });
});
