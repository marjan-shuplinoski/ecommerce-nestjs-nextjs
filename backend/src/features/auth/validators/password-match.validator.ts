import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'PasswordMatch', async: false })
export class PasswordMatchConstraint implements ValidatorConstraintInterface {
  validate(confirmPassword: string, args: ValidationArguments): boolean {
    if (!Array.isArray(args.constraints) || args.constraints.length === 0) {
      return false;
    }
    const relatedPropertyName = args.constraints[0] as string;
    const password = (args.object as Record<string, unknown>)[relatedPropertyName];
    return confirmPassword === password;
  }

  defaultMessage(): string {
    return 'Password confirmation must match password';
  }
}

export function PasswordMatch(property: string, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: PasswordMatchConstraint,
    });
  };
}
