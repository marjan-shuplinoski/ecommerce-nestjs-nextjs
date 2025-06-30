import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ? Number(process.env.PORT) : 5000;
  const host = process.env.HOST || 'localhost';
  await app.listen(port);
  console.log(`🚀 Backend server running at http://${host}:${port}`);
}

void bootstrap();
