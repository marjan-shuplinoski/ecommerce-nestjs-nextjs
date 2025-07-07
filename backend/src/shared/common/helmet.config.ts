// backend/src/shared/common/helmet.config.ts
import { HelmetOptions } from 'helmet';

export const helmetConfig: HelmetOptions = {
  // Content Security Policy
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https:'],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      imgSrc: ["'self'", 'data:', 'https:', 'blob:'],
      fontSrc: ["'self'", 'https:', 'data:'],
      connectSrc: ["'self'", 'https:', 'wss:'],
      mediaSrc: ["'self'", 'https:', 'blob:'],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
      formAction: ["'self'"],
      upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? [] : null,
    },
  },

  // Cross-Origin policies
  crossOriginEmbedderPolicy: false, // Allow embedding for development
  crossOriginResourcePolicy: { policy: 'cross-origin' },

  // Security headers
  frameguard: {
    action: 'deny', // Prevent clickjacking
  },

  hidePoweredBy: true, // Hide X-Powered-By header

  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true,
  },

  ieNoOpen: true, // Prevent IE from executing downloads in site's context

  noSniff: true, // Prevent MIME type sniffing

  originAgentCluster: true, // Isolate document in its own origin agent cluster

  permittedCrossDomainPolicies: false, // Restrict Adobe Flash and PDF cross-domain policies

  referrerPolicy: {
    policy: ['strict-origin-when-cross-origin'],
  },

  xssFilter: true, // Basic XSS protection
};
