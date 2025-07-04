import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { NotificationService } from '../../../shared/notification';

export interface JwtPayload {
  sub: string;
  email: string;
  // add more fields as needed
}

function isJwtPayload(obj: unknown): obj is JwtPayload {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'sub' in obj &&
    typeof (obj as Record<string, unknown>).sub === 'string' &&
    'email' in obj &&
    typeof (obj as Record<string, unknown>).email === 'string'
  );
}

@Injectable()
export class JwtService {
  private readonly jwt: NestJwtService;
  constructor(
    jwtService: NestJwtService,
    private readonly notificationService: NotificationService,
  ) {
    this.jwt = jwtService;
  }

  async signAccessToken(payload: JwtPayload, options?: JwtSignOptions): Promise<string> {
    const token: string = await this.jwt.signAsync(payload, { ...options, expiresIn: '15m' });
    this.notificationService.notifySuccess('Access token issued', payload.sub);
    return token;
  }

  async signRefreshToken(payload: JwtPayload, options?: JwtSignOptions): Promise<string> {
    const token: string = await this.jwt.signAsync(payload, { ...options, expiresIn: '7d' });
    this.notificationService.notifySuccess('Refresh token issued', payload.sub);
    return token;
  }

  async verifyToken(token: string, options?: JwtVerifyOptions): Promise<JwtPayload> {
    try {
      const rawPayload: unknown = await this.jwt.verifyAsync(token, options);
      if (isJwtPayload(rawPayload)) {
        this.notificationService.notifySuccess('Token verified', rawPayload.sub);
        return rawPayload;
      } else {
        this.notificationService.notifyWarning('Token verified but payload invalid');
        throw new Error('Invalid JWT payload');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      this.notificationService.notifyError('Token verification failed', message);
      throw error;
    }
  }
}
