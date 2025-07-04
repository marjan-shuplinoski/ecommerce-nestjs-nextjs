import { JwtService } from './jwt.service';
import { NotificationService } from '../../../shared/notification';

describe('JwtService', () => {
  let jwtService: JwtService;
  let notificationService: NotificationService;
  let mockJwt: any;

  beforeEach(() => {
    notificationService = new NotificationService();
    mockJwt = {
      signAsync: jest.fn().mockResolvedValue('token'),
      verifyAsync: jest.fn().mockResolvedValue({ sub: 'userId', email: 'test@example.com' }),
    };
    jwtService = new JwtService(mockJwt, notificationService);
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    mockJwt.verifyAsync.mockResolvedValue({});
    await expect(jwtService.verifyToken('token')).rejects.toThrow('Invalid JWT payload');
  });

  it('should throw and notify on error', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    mockJwt.verifyAsync.mockRejectedValue(new Error('fail'));
    await expect(jwtService.verifyToken('token')).rejects.toThrow('fail');
  });
});
