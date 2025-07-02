import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  const port = process.env.PORT ? Number(process.env.PORT) : 5000;
  const host = process.env.HOST || 'localhost';
  const dbUri = process.env.MONGODB_URI || 'not set';
  await app.listen(port);
  console.log(`🚀 Backend server running at http://${host}:${port}`);
  console.log(`🗄️  Connected to MongoDB: ${dbUri}`);
}

void bootstrap();
