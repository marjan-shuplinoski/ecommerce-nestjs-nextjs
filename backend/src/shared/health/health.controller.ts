/**
 * HealthController - Provides /health endpoint for DB health check using Terminus.
 * Returns status and error details if DB is unreachable.
 */
import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HealthCheck,
  MongooseHealthIndicator,
  HealthCheckResult,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly db: MongooseHealthIndicator,
  ) {}

  /**
   * GET /health - Returns MongoDB health status
   */
  @Get()
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    try {
      return await this.health.check([() => this.db.pingCheck('mongodb')]);
    } catch (error: unknown) {
      let message = 'Unknown error';
      if (
        typeof error === 'object' &&
        error &&
        'message' in error &&
        typeof (error as Record<string, unknown>).message === 'string'
      ) {
        message = String((error as Record<string, unknown>).message);
      }
      return {
        status: 'error',
        info: {},
        error: {
          mongodb: {
            status: 'down',
            message,
          },
        },
        details: {},
      };
    }
  }
}
