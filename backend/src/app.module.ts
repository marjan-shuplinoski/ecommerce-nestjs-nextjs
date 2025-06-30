import { Module } from '@nestjs/common';
import { ConfigModule } from './shared/config/config.module';
import { DatabaseModule } from './shared/database/database.module';
import { HealthModule } from './shared/health/health.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule, DatabaseModule, HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
