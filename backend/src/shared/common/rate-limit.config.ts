// backend/src/shared/common/rate-limit.config.ts
import { ThrottlerModuleOptions } from '@nestjs/throttler';

export const rateLimitConfig: ThrottlerModuleOptions = [
  {
    name: 'short', // Short-term rate limiting
    ttl: 60000, // 1 minute
    limit: 20, // 20 requests per minute
  },
  {
    name: 'medium', // Medium-term rate limiting
    ttl: 600000, // 10 minutes
    limit: 100, // 100 requests per 10 minutes
  },
  {
    name: 'long', // Long-term rate limiting
    ttl: 3600000, // 1 hour
    limit: 500, // 500 requests per hour
  },
];

// Custom rate limits for specific endpoints
export const authRateLimit = {
  name: 'auth',
  ttl: 900000, // 15 minutes
  limit: 5, // 5 attempts per 15 minutes
};

export const uploadRateLimit = {
  name: 'upload',
  ttl: 60000, // 1 minute
  limit: 3, // 3 uploads per minute
};
