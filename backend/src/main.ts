import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { corsConfig, helmetConfig } from './shared/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Security middleware
  app.use(helmet(helmetConfig));
  app.enableCors(corsConfig);

  // Trust proxy if enabled (for production deployments)
  if (process.env.ENABLE_TRUST_PROXY === 'true') {
    app.set('trust proxy', 1);
  }

  app.setGlobalPrefix('/api');
  const port = process.env.PORT ? Number(process.env.PORT) : 5000;
  const host = process.env.HOST || 'localhost';
  const dbUri = process.env.MONGODB_URI || 'not set';

  await app.listen(port);
  console.log(`🚀 Backend server running at http://${host}:${port}`);
  console.log(`🗄️  Connected to MongoDB: ${dbUri}`);
  console.log(`🔒 Security middleware enabled`);
}

void bootstrap();
