import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { RegisterDto } from './register.dto';

describe('RegisterDto', () => {
  it('should pass validation with valid data', async () => {
    const registerData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'SecurePass123!',
      confirmPassword: 'SecurePass123!',
    };

    const registerDto = plainToClass(RegisterDto, registerData);
    const errors = await validate(registerDto as object);

    expect(errors).toHaveLength(0);
  });

  it('should fail validation with short name', async () => {
    const registerData = {
      name: 'J',
      email: 'john.doe@example.com',
      password: 'SecurePass123!',
      confirmPassword: 'SecurePass123!',
    };

    const registerDto = plainToClass(RegisterDto, registerData);
    const errors = await validate(registerDto as object);

    expect(errors.length).toBeGreaterThan(0);
    const nameError = errors.find((error) => error.property === 'name');
    expect(nameError).toBeDefined();
    expect(nameError?.constraints?.minLength).toContain('Name must be at least 2 characters long');
  });

  it('should fail validation with invalid email', async () => {
    const registerData = {
      name: 'John Doe',
      email: 'invalid-email',
      password: 'SecurePass123!',
      confirmPassword: 'SecurePass123!',
    };

    const registerDto = plainToClass(RegisterDto, registerData);
    const errors = await validate(registerDto as object);

    expect(errors.length).toBeGreaterThan(0);
    const emailError = errors.find((error) => error.property === 'email');
    expect(emailError).toBeDefined();
    expect(emailError?.constraints?.isEmail).toContain('Please provide a valid email address');
  });

  it('should transform email to lowercase', () => {
    const registerData = {
      name: 'John Doe',
      email: 'JOHN.DOE@EXAMPLE.COM',
      password: 'SecurePass123!',
      confirmPassword: 'SecurePass123!',
    };

    const registerDto = plainToClass(RegisterDto, registerData);
    expect((registerDto as unknown as RegisterDto).email).toBe('john.doe@example.com');
  });

  it('should fail validation with weak password', async () => {
    const registerData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'weak',
      confirmPassword: 'weak',
    };

    const registerDto = plainToClass(RegisterDto, registerData);
    const errors = await validate(registerDto as object);

    expect(errors.length).toBeGreaterThan(0);
    const passwordError = errors.find((error) => error.property === 'password');
    expect(passwordError).toBeDefined();
    expect(passwordError?.constraints?.minLength).toContain(
      'Password must be at least 8 characters long',
    );
  });

  it('should fail validation when passwords do not match', async () => {
    const registerData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'SecurePass123!',
      confirmPassword: 'DifferentPass123!',
    };

    const registerDto = plainToClass(RegisterDto, registerData);
    const errors = await validate(registerDto as object);

    expect(errors.length).toBeGreaterThan(0);
    const confirmPasswordError = errors.find((error) => error.property === 'confirmPassword');
    expect(confirmPasswordError).toBeDefined();
  });
});
