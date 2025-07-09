import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { RegisterDto } from '../dto/register.dto';
import { UserProfileService } from '../../user/services/user-profile.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userProfileService: UserProfileService,
  ) { }

  register(dto: RegisterDto) {
    // TODO: Implement registration logic
    return { id: 1, email: dto.email };
  }

  async login(dto: { email: string; password: string }) {
    // Find user by email
    const userResult = await this.userProfileService.getUserByEmail(dto.email);
    if (!userResult.data) throw new UnauthorizedException('Invalid credentials');
    const user = userResult.data as { _id: string; email: string; password: string };
    // Check password
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');
    const payload = { sub: String(user._id), email: user.email };
    const accessToken = await this.jwtService.signAccessToken(payload);
    const refreshToken = await this.jwtService.signRefreshToken(payload);
    return { accessToken, refreshToken };
  }

  async refresh(user: { id: string; email: string }) {
    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAccessToken(payload);
    const refreshToken = await this.jwtService.signRefreshToken(payload);
    return { accessToken, refreshToken };
  }

  logout() {
    // TODO: Implement logout logic
    return true;
  }

  resetPassword() {
    // TODO: Implement reset password logic
    return true;
  }
}
