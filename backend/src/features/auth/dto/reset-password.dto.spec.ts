import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ResetPasswordDto } from './reset-password.dto';

describe('ResetPasswordDto', () => {
  it('should pass validation with valid data', async () => {
    const resetPasswordData = {
      token: 'abc123def456ghi789',
      password: 'NewSecurePass123!',
      confirmPassword: 'NewSecurePass123!',
    };

    const resetPasswordDto = plainToClass(ResetPasswordDto, resetPasswordData);
    const errors = await validate(resetPasswordDto as object);

    expect(errors).toHaveLength(0);
  });

  it('should fail validation with empty token', async () => {
    const resetPasswordData = {
      token: '',
      password: 'NewSecurePass123!',
      confirmPassword: 'NewSecurePass123!',
    };

    const resetPasswordDto = plainToClass(ResetPasswordDto, resetPasswordData);
    const errors = await validate(resetPasswordDto as object);

    expect(errors.length).toBeGreaterThan(0);
    const tokenError = errors.find((error) => error.property === 'token');
    expect(tokenError).toBeDefined();
    expect(tokenError?.constraints?.minLength).toContain('Reset token is required');
  });

  it('should fail validation with weak password', async () => {
    const resetPasswordData = {
      token: 'abc123def456ghi789',
      password: 'weak',
      confirmPassword: 'weak',
    };

    const resetPasswordDto = plainToClass(ResetPasswordDto, resetPasswordData);
    const errors = await validate(resetPasswordDto as object);

    expect(errors.length).toBeGreaterThan(0);
    const passwordError = errors.find((error) => error.property === 'password');
    expect(passwordError).toBeDefined();
    expect(passwordError?.constraints?.minLength).toContain(
      'Password must be at least 8 characters long',
    );
  });

  it('should fail validation when passwords do not match', async () => {
    const resetPasswordData = {
      token: 'abc123def456ghi789',
      password: 'NewSecurePass123!',
      confirmPassword: 'DifferentPass123!',
    };

    const resetPasswordDto = plainToClass(ResetPasswordDto, resetPasswordData);
    const errors = await validate(resetPasswordDto as object);

    expect(errors.length).toBeGreaterThan(0);
    const confirmPasswordError = errors.find((error) => error.property === 'confirmPassword');
    expect(confirmPasswordError).toBeDefined();
  });
});
