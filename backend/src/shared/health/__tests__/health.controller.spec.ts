import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from '../health.controller';
import { HealthCheckService, MongooseHealthIndicator } from '@nestjs/terminus';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthCheckService,
          useValue: { check: jest.fn() },
        },
        {
          provide: MongooseHealthIndicator,
          useValue: { pingCheck: jest.fn() },
        },
      ],
    }).compile();
    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
