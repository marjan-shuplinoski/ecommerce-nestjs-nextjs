import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { NotificationService } from '../../../shared/notification';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly notificationService: NotificationService) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest<TUser = any>(err: any, user: any): TUser {
    if (err || !user) {
      const notification = this.notificationService.notifyError(
        'Authentication required. Please provide a valid access token.',
        'AUTH_REQUIRED',
      );

      throw new UnauthorizedException({
        message: 'Authentication required',
        notification,
        statusCode: 401,
      });
    }

    return user as TUser;
  }
}
