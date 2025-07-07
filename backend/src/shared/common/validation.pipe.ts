// backend/src/shared/common/validation.pipe.ts
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass, ClassConstructor } from 'class-transformer';
import { NotificationService } from '../notification';

@Injectable()
export class GlobalValidationPipe implements PipeTransform<unknown> {
  constructor(private readonly notificationService: NotificationService) {}

  async transform(value: unknown, { metatype }: ArgumentMetadata): Promise<unknown> {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object, {
      whitelist: true, // Strip unknown properties
      forbidNonWhitelisted: true, // Throw error for unknown properties
      skipMissingProperties: false, // Validate all properties
      validationError: { target: false }, // Don't include target in error
    });

    if (errors.length > 0) {
      const errorMessages = this.formatValidationErrors(errors);
      const notification = this.notificationService.notifyError(
        errorMessages.join('; '),
        'VALIDATION_ERROR',
      );

      throw new BadRequestException({
        message: errorMessages,
        error: 'Validation failed',
        statusCode: 400,
        notification,
      });
    }

    return object;
  }

  private toValidate(metatype: unknown): metatype is ClassConstructor<object> {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype as never);
  }

  private formatValidationErrors(errors: ValidationError[]): string[] {
    const messages: string[] = [];

    for (const error of errors) {
      if (error.constraints) {
        // Add constraint messages
        Object.values(error.constraints).forEach((message) => {
          messages.push(message);
        });
      }

      // Handle nested validation errors
      if (error.children && error.children.length > 0) {
        const nestedMessages = this.formatValidationErrors(error.children);
        messages.push(...nestedMessages);
      }
    }

    return messages;
  }
}
