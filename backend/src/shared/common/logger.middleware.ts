// backend/src/shared/common/logger.middleware.ts
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

interface LoggedRequest extends Request {
  startTime?: number;
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: LoggedRequest, res: Response, next: NextFunction): void {
    const { method, url, ip } = req;
    const userAgent = req.get('User-Agent') || 'Unknown';
    req.startTime = Date.now();

    // Generate unique request ID if not present
    const requestId = req.headers['x-request-id'] || this.generateRequestId();
    req.headers['x-request-id'] = requestId as string;

    // Log incoming request
    this.logger.log(
      `Incoming ${method} ${url}`,
      JSON.stringify({
        method,
        url,
        ip,
        userAgent,
        requestId,
        timestamp: new Date().toISOString(),
      }),
    );

    // Log response when finished
    res.on('finish', () => {
      const { statusCode } = res;
      const responseTime = req.startTime ? Date.now() - req.startTime : 0;
      const contentLength = res.get('Content-Length') || '0';

      const logData = {
        method,
        url,
        statusCode,
        responseTime: `${responseTime}ms`,
        contentLength: `${contentLength}B`,
        ip,
        userAgent,
        requestId,
        timestamp: new Date().toISOString(),
      };

      // Choose log level based on status code
      if (statusCode >= 500) {
        this.logger.error(
          `${method} ${url} ${statusCode} - ${responseTime}ms`,
          JSON.stringify(logData),
        );
      } else if (statusCode >= 400) {
        this.logger.warn(
          `${method} ${url} ${statusCode} - ${responseTime}ms`,
          JSON.stringify(logData),
        );
      } else {
        this.logger.log(
          `${method} ${url} ${statusCode} - ${responseTime}ms`,
          JSON.stringify(logData),
        );
      }
    });

    next();
  }

  private generateRequestId(): string {
    return (
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    );
  }
}
