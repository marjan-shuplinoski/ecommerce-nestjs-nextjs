import { Module } from '@nestjs/common';
import { ConfigModule } from './shared/config/config.module';
import { DatabaseModule } from './shared/database/database.module';
import { HealthModule } from './shared/health/health.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './features/products/product.module';

@Module({
  imports: [ConfigModule, DatabaseModule, HealthModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
