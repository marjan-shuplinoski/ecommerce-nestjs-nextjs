// backend/src/shared/common/cors.config.ts
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    // Get allowed origins from environment variables
    const allowedOrigins = process.env.CORS_ORIGIN?.split(',').map((o) => o.trim()) || [];

    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);

    // Check if origin is allowed
    if (allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }

    return callback(new Error('CORS policy violation'), false);
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'Cache-Control',
    'X-File-Name',
  ],
  credentials: true,
  optionsSuccessStatus: 200, // Support legacy browsers
  maxAge: 86400, // Cache preflight response for 24 hours
};
