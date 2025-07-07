import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../user/schemas/user.schema';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { NotificationService } from '../../../shared/notification';

interface AuthenticatedUser {
  id: string;
  email: string;
  role: UserRole;
}

interface RequestWithUser extends Request {
  user: AuthenticatedUser;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly notificationService: NotificationService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // No roles required, allow access
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    if (!user) {
      const notification = this.notificationService.notifyError(
        'User not authenticated.',
        'USER_NOT_AUTHENTICATED',
      );

      throw new ForbiddenException({
        message: 'User not authenticated',
        notification,
        statusCode: 403,
      });
    }

    const hasRole = requiredRoles.some((role) => user.role === role);

    if (!hasRole) {
      const notification = this.notificationService.notifyError(
        `Access denied. Required roles: ${requiredRoles.join(', ')}. Your role: ${user.role || 'none'}.`,
        'INSUFFICIENT_PERMISSIONS',
      );

      throw new ForbiddenException({
        message: 'Insufficient permissions',
        notification,
        statusCode: 403,
      });
    }

    return true;
  }
}
