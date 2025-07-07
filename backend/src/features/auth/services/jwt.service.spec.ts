import { JwtService } from './jwt.service';
import { NotificationService } from '../../../shared/notification';

describe('JwtService', () => {
  let jwtService: JwtService;
  let notificationService: NotificationService;
  let mockJwt: { signAsync: jest.Mock; verifyAsync: jest.Mock };

  beforeEach(() => {
    notificationService = new NotificationService();
    mockJwt = {
      signAsync: jest.fn().mockResolvedValue('token'),
      verifyAsync: jest.fn().mockResolvedValue({ sub: 'userId', email: 'test@example.com' }),
    };
    // Provide a properly typed mock for testing
    jwtService = new JwtService(
      mockJwt as unknown as ConstructorParameters<typeof JwtService>[0],
      notificationService,
    );
  });

  it('should sign access token and notify', async () => {
    const token = await jwtService.signAccessToken({ sub: 'userId', email: 'test@example.com' });
    expect(token).toBe('token');
  });

  it('should sign refresh token and notify', async () => {
    const token = await jwtService.signRefreshToken({ sub: 'userId', email: 'test@example.com' });
    expect(token).toBe('token');
  });

  it('should verify token and notify', async () => {
    const payload = await jwtService.verifyToken('token');
    expect(payload).toEqual({ sub: 'userId', email: 'test@example.com' });
  });

  it('should throw and notify on invalid payload', async () => {
    mockJwt.verifyAsync.mockResolvedValue({});
    await expect(jwtService.verifyToken('token')).rejects.toThrow('Invalid JWT payload');
  });

  it('should throw and notify on error', async () => {
    mockJwt.verifyAsync.mockRejectedValue(new Error('fail'));
    await expect(jwtService.verifyToken('token')).rejects.toThrow('fail');
  });
});
