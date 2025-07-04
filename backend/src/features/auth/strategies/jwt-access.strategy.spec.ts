import { JwtAccessStrategy } from './jwt-access.strategy';
import { ConfigService } from '@nestjs/config';

describe('JwtAccessStrategy', () => {
  it('should be defined and validate payload', () => {
    const configService = { get: jest.fn().mockReturnValue('secret') } as unknown as ConfigService;
    const strategy = new JwtAccessStrategy(configService);
    const payload = { sub: 'userId', email: 'test@example.com' };
    expect(strategy.validate(payload)).toEqual(payload);
  });
});
