import { Controller, Post, Body, Res, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { NotificationService } from '../../../shared/notification';
import { Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  register(@Body() dto: RegisterDto, @Res() res: Response) {
    try {
      const user = this.authService.register(dto);
      return res.status(201).json({
        data: user,
        notification: this.notificationService.notifySuccess('Registration successful'),
      });
    } catch (error: unknown) {
      const err = error as Error;
      return res.status(400).json({
        notification: this.notificationService.notifyError(err.message || 'Registration failed'),
      });
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Login successful.' })
  login(@Body() dto: LoginDto, @Res() res: Response) {
    try {
      const tokens = this.authService.login();
      return res.status(200).json({
        data: tokens,
        notification: this.notificationService.notifySuccess('Login successful'),
      });
    } catch (error: unknown) {
      const err = error as Error;
      return res.status(401).json({
        notification: this.notificationService.notifyError(err.message || 'Invalid credentials'),
      });
    }
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200, description: 'Logout successful.' })
  @UseGuards(JwtAuthGuard)
  logout(@Request() req: { user: { id: number } }, @Res() res: Response) {
    try {
      this.authService.logout();
      return res.status(200).json({
        notification: this.notificationService.notifySuccess('Logout successful'),
      });
    } catch (error: unknown) {
      const err = error as Error;
      return res.status(400).json({
        notification: this.notificationService.notifyError(err.message || 'Logout failed'),
      });
    }
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh JWT token' })
  @ApiResponse({ status: 200, description: 'Token refreshed.' })
  refresh(@Body('refreshToken') refreshToken: string, @Res() res: Response) {
    try {
      const tokens = this.authService.refresh();
      return res.status(200).json({
        data: tokens,
        notification: this.notificationService.notifySuccess('Token refreshed'),
      });
    } catch (error: unknown) {
      const err = error as Error;
      return res.status(401).json({
        notification: this.notificationService.notifyError(err.message || 'Invalid refresh token'),
      });
    }
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset user password' })
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({ status: 200, description: 'Password reset successful.' })
  resetPassword(@Body() dto: ResetPasswordDto, @Res() res: Response) {
    try {
      this.authService.resetPassword();
      return res.status(200).json({
        notification: this.notificationService.notifySuccess('Password reset successful'),
      });
    } catch (error: unknown) {
      const err = error as Error;
      return res.status(400).json({
        notification: this.notificationService.notifyError(err.message || 'Password reset failed'),
      });
    }
  }
}
