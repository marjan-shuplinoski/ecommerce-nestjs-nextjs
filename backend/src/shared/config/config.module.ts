import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.example'],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
        PORT: Joi.number().default(5000),
        HOST: Joi.string().default('localhost'),
        MONGODB_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRE: Joi.string().required(),
        CORS_ORIGIN: Joi.string().required(),
        CLOUDINARY_CLOUD_NAME: Joi.string().required(),
        CLOUDINARY_API_KEY: Joi.string().required(),
        CLOUDINARY_API_SECRET: Joi.string().required(),
        // Security-related environment variables
        RATE_LIMIT_TTL: Joi.number().default(60000),
        RATE_LIMIT_MAX: Joi.number().default(20),
        ENABLE_TRUST_PROXY: Joi.string().valid('true', 'false').default('false'),
      }),
    }),
  ],
})
export class ConfigModule {}
