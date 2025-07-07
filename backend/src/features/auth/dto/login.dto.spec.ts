import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { LoginDto } from './login.dto';

describe('LoginDto', () => {
  it('should pass validation with valid data', async () => {
    const loginData = {
      email: 'john.doe@example.com',
      password: 'SecurePass123!',
    };

    const loginDto = plainToClass(LoginDto, loginData);
    const errors = await validate(loginDto as object);

    expect(errors).toHaveLength(0);
  });

  it('should fail validation with invalid email', async () => {
    const loginData = {
      email: 'invalid-email',
      password: 'SecurePass123!',
    };

    const loginDto = plainToClass(LoginDto, loginData);
    const errors = await validate(loginDto as object);

    expect(errors.length).toBeGreaterThan(0);
    const emailError = errors.find((error) => error.property === 'email');
    expect(emailError).toBeDefined();
    expect(emailError?.constraints?.isEmail).toContain('Please provide a valid email address');
  });

  it('should fail validation with empty password', async () => {
    const loginData = {
      email: 'john.doe@example.com',
      password: '',
    };

    const loginDto = plainToClass(LoginDto, loginData);
    const errors = await validate(loginDto as object);

    expect(errors.length).toBeGreaterThan(0);
    const passwordError = errors.find((error) => error.property === 'password');
    expect(passwordError).toBeDefined();
    expect(passwordError?.constraints?.minLength).toContain('Password is required');
  });

  it('should transform email to lowercase', () => {
    const loginData = {
      email: 'JOHN.DOE@EXAMPLE.COM',
      password: 'SecurePass123!',
    };

    const loginDto = plainToClass(LoginDto, loginData);
    expect((loginDto as unknown as LoginDto).email).toBe('john.doe@example.com');
  });
});
