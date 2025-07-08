import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class AuthService {
  register(dto: RegisterDto) {
    // TODO: Implement registration logic
    return { id: 1, email: dto.email };
  }

  login() {
    // TODO: Implement login logic
    return { accessToken: 'token', refreshToken: 'refresh' };
  }

  logout() {
    // TODO: Implement logout logic
    return true;
  }

  refresh() {
    // TODO: Implement refresh logic
    return { accessToken: 'token', refreshToken: 'refresh' };
  }

  resetPassword() {
    // TODO: Implement reset password logic
    return true;
  }
}
