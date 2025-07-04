import { JwtRefreshStrategy } from './jwt-refresh.strategy';
import { ConfigService } from '@nestjs/config';

describe('JwtRefreshStrategy', () => {
  it('should be defined and validate payload', () => {
    const configService = { get: jest.fn().mockReturnValue('secret') } as unknown as ConfigService;
    const strategy = new JwtRefreshStrategy(configService);
    const payload = { sub: 'userId', email: 'test@example.com' };
    expect(strategy.validate(payload)).toEqual(payload);
  });
});
