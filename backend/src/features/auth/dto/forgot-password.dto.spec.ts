import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ForgotPasswordDto } from './forgot-password.dto';

describe('ForgotPasswordDto', () => {
  it('should pass validation with valid email', async () => {
    const forgotPasswordData = {
      email: 'john.doe@example.com',
    };

    const forgotPasswordDto = plainToClass(ForgotPasswordDto, forgotPasswordData);
    const errors = await validate(forgotPasswordDto as object);

    expect(errors).toHaveLength(0);
  });

  it('should fail validation with invalid email', async () => {
    const forgotPasswordData = {
      email: 'invalid-email',
    };

    const forgotPasswordDto = plainToClass(ForgotPasswordDto, forgotPasswordData);
    const errors = await validate(forgotPasswordDto as object);

    expect(errors.length).toBeGreaterThan(0);
    const emailError = errors.find((error) => error.property === 'email');
    expect(emailError).toBeDefined();
    expect(emailError?.constraints?.isEmail).toContain('Please provide a valid email address');
  });

  it('should transform email to lowercase', () => {
    const forgotPasswordData = {
      email: 'JOHN.DOE@EXAMPLE.COM',
    };

    const forgotPasswordDto = plainToClass(ForgotPasswordDto, forgotPasswordData);
    expect((forgotPasswordDto as unknown as ForgotPasswordDto).email).toBe('john.doe@example.com');
  });
});
