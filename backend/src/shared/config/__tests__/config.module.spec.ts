import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '../config.module';
import { ConfigService } from '@nestjs/config';

describe('ConfigModule', () => {
  it('should provide ConfigService with env variables', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
    }).compile();
    const configService = module.get<ConfigService>(ConfigService);
    expect(configService).toBeDefined();
    expect(typeof configService.get('MONGODB_URI')).toBe('string');
  });
});
