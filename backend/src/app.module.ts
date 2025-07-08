import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from './shared/config/config.module';
import { DatabaseModule } from './shared/database/database.module';
import { HealthModule } from './shared/health/health.module';
import { NotificationService } from './shared/notification';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './features/products/product.module';
import { CartModule } from './features/cart/cart.module';
import {
  HttpExceptionFilter,
  GlobalValidationPipe,
  LoggerMiddleware,
  rateLimitConfig,
} from './shared/common';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    HealthModule,
    ProductModule,
    CartModule,
    ThrottlerModule.forRoot(rateLimitConfig),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    NotificationService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: GlobalValidationPipe,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
