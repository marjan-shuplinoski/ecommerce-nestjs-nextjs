import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { JwtService } from './services/jwt.service';
import { NotificationService } from '../../shared/notification';

describe('AuthModule (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      providers: [NotificationService],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    jwtService = moduleFixture.get(JwtService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should sign and verify access token', async () => {
    const payload = { sub: 'userId', email: 'test@example.com' };
    const token = await jwtService.signAccessToken(payload);
    expect(typeof token).toBe('string');
    const verified = await jwtService.verifyToken(token);
    expect(verified).toMatchObject(payload);
  });

  it('should sign and verify refresh token', async () => {
    const payload = { sub: 'userId', email: 'test@example.com' };
    const token = await jwtService.signRefreshToken(payload);
    expect(typeof token).toBe('string');
    const verified = await jwtService.verifyToken(token);
    expect(verified).toMatchObject(payload);
  });

  it('should fail to verify invalid token', async () => {
    await expect(jwtService.verifyToken('invalid.token')).rejects.toThrow();
  });
});
