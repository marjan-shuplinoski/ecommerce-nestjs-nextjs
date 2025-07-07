import { ValidationArguments } from 'class-validator';
import { PasswordMatchConstraint } from './password-match.validator';

describe('PasswordMatchConstraint', () => {
  let constraint: PasswordMatchConstraint;

  beforeEach(() => {
    constraint = new PasswordMatchConstraint();
  });

  describe('validate', () => {
    it('should return true when passwords match', () => {
      const args: ValidationArguments = {
        object: { password: 'test123', confirmPassword: 'test123' },
        property: 'confirmPassword',
        value: 'test123',
        constraints: ['password'],
        targetName: 'TestObject',
      };

      const result = constraint.validate('test123', args);
      expect(result).toBe(true);
    });

    it('should return false when passwords do not match', () => {
      const args: ValidationArguments = {
        object: { password: 'test123', confirmPassword: 'different' },
        property: 'confirmPassword',
        value: 'different',
        constraints: ['password'],
        targetName: 'TestObject',
      };

      const result = constraint.validate('different', args);
      expect(result).toBe(false);
    });

    it('should return false when constraints array is empty', () => {
      const args: ValidationArguments = {
        object: { password: 'test123', confirmPassword: 'test123' },
        property: 'confirmPassword',
        value: 'test123',
        constraints: [],
        targetName: 'TestObject',
      };

      const result = constraint.validate('test123', args);
      expect(result).toBe(false);
    });

    it('should return false when constraints is not an array', () => {
      const args: ValidationArguments = {
        object: { password: 'test123', confirmPassword: 'test123' },
        property: 'confirmPassword',
        value: 'test123',
        constraints: 'password' as unknown as string[],
        targetName: 'TestObject',
      };

      const result = constraint.validate('test123', args);
      expect(result).toBe(false);
    });

    it('should handle undefined passwords correctly', () => {
      const args: ValidationArguments = {
        object: { password: undefined, confirmPassword: undefined },
        property: 'confirmPassword',
        value: undefined,
        constraints: ['password'],
        targetName: 'TestObject',
      };

      const result = constraint.validate(undefined as unknown as string, args);
      expect(result).toBe(true);
    });
  });

  describe('defaultMessage', () => {
    it('should return the correct default message', () => {
      const result = constraint.defaultMessage();
      expect(result).toBe('Password confirmation must match password');
    });
  });
});
