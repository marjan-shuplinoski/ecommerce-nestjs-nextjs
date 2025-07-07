// backend/src/shared/common/http-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { NotificationService, Notification } from '../notification';

interface ErrorResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  notification: Notification;
  requestId?: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  constructor(private readonly notificationService: NotificationService) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { status, notification } = this.getStatusAndNotification(exception);

    const errorResponse: ErrorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      notification,
      requestId: request.headers['x-request-id'] as string,
    };

    // Log the error with appropriate level
    this.logError(exception, errorResponse, request);

    response.status(status).json(errorResponse);
  }

  private getStatusAndNotification(exception: unknown): {
    status: number;
    notification: Notification;
  } {
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      let message: string;
      let code: string | number = status;

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const response = exceptionResponse as Record<string, unknown>;
        message = (response.message as string) || (response.error as string) || exception.message;
        code = (response.code as string | number) || status;

        // Handle validation errors specifically
        if (Array.isArray(response.message)) {
          message = (response.message as string[]).join(', ');
        }
      } else {
        message = exception.message;
      }

      // Determine notification type based on status code
      const notificationType = this.getNotificationTypeFromStatus(status);

      return {
        status,
        notification: this.notificationService[notificationType](message, code),
      };
    }

    // Handle unexpected errors
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      process.env.NODE_ENV === 'production'
        ? 'Internal server error'
        : exception instanceof Error
          ? exception.message
          : 'Unknown error occurred';

    return {
      status,
      notification: this.notificationService.notifyError(message, 'INTERNAL_ERROR'),
    };
  }

  private getNotificationTypeFromStatus(status: number): 'notifyError' | 'notifyWarning' {
    if (status >= 500) {
      return 'notifyError';
    }
    if (status >= 400) {
      return 'notifyWarning';
    }
    return 'notifyWarning'; // Default for client errors
  }

  private logError(exception: unknown, errorResponse: ErrorResponse, request: Request): void {
    const { statusCode, path, method, notification } = errorResponse;
    const userAgent = request.headers['user-agent'] || 'Unknown';
    const ip = request.ip || request.connection.remoteAddress || 'Unknown';

    const logContext = {
      path,
      method,
      statusCode,
      ip,
      userAgent,
      requestId: errorResponse.requestId,
      notification: notification.message,
    };

    if (statusCode >= 500) {
      // Log server errors with full stack trace
      this.logger.error(
        `Server Error: ${notification.message}`,
        exception instanceof Error ? exception.stack : 'No stack trace',
        logContext,
      );
    } else if (statusCode >= 400) {
      // Log client errors with less detail
      this.logger.warn(`Client Error: ${notification.message}`, logContext);
    }
  }
}
