// backend/src/shared/common/__tests__/validation.pipe.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, ArgumentMetadata } from '@nestjs/common';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { GlobalValidationPipe } from '../validation.pipe';
import { NotificationService } from '../../notification';

class TestDto {
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;
}

describe('GlobalValidationPipe', () => {
  let pipe: GlobalValidationPipe;
  let notificationService: NotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GlobalValidationPipe,
        {
          provide: NotificationService,
          useValue: {
            notifyError: jest.fn().mockReturnValue({
              type: 'error',
              message: 'Validation failed',
              code: 'VALIDATION_ERROR',
            }),
          },
        },
      ],
    }).compile();

    pipe = module.get<GlobalValidationPipe>(GlobalValidationPipe);
    notificationService = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  it('should return the value if no metatype is provided', async () => {
    const value = { test: 'value' };
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: undefined,
      data: undefined,
    };

    const result = await pipe.transform(value, metadata);
    expect(result).toBe(value);
  });

  it('should return the value for primitive types', async () => {
    const value = 'test string';
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: String,
      data: undefined,
    };

    const result = await pipe.transform(value, metadata);
    expect(result).toBe(value);
  });

  it('should validate and transform valid data', async () => {
    const value = { name: 'John Doe', email: 'john@example.com' };
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: TestDto,
      data: undefined,
    };

    const result = await pipe.transform(value, metadata);
    expect(result).toBeInstanceOf(TestDto);
    expect(result).toEqual(expect.objectContaining(value));
  });

  it('should throw BadRequestException for invalid data', async () => {
    const value = { name: '', email: 'invalid-email' };
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: TestDto,
      data: undefined,
    };

    await expect(pipe.transform(value, metadata)).rejects.toThrow(BadRequestException);
    const notifyErrorSpy = jest.spyOn(notificationService, 'notifyError');
    expect(notifyErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('name should not be empty'),
      'VALIDATION_ERROR',
    );
  });

  it('should handle empty objects', async () => {
    const value = {};
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: TestDto,
      data: undefined,
    };

    await expect(pipe.transform(value, metadata)).rejects.toThrow(BadRequestException);
  });
});
