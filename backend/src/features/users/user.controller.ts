import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  Post,
  Delete,
  Patch,
  Query,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { UserService } from './services/user.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AddAddressDto } from './dto/add-address.dto';
import { UserProfile, UserAddress } from './types/user.types';
import { Request } from 'express';

interface AuthUser {
  id: string;
  // add other properties if needed
}

export const UserId = createParamDecorator((data: unknown, ctx: ExecutionContext): string => {
  const request = ctx.switchToHttp().getRequest<Request & { user?: AuthUser }>();
  return request.user?.id ?? 'demo-user';
});

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  getProfile(@UserId() userId: string): Promise<UserProfile> {
    return this.userService.getProfile(userId);
  }

  @Put('profile')
  updateProfile(
    @UserId() userId: string,
    @Body() dto: UpdateProfileDto,
  ): Promise<{ message: string; color: string; user: UserProfile }> {
    return this.userService.updateProfile(userId, dto);
  }

  @Post('address')
  addAddress(
    @UserId() userId: string,
    @Body() dto: AddAddressDto,
  ): Promise<{ message: string; color: string; addresses: UserAddress[] }> {
    return this.userService.addAddress(userId, dto);
  }

  @Put('address/:addressId')
  updateAddress(
    @UserId() userId: string,
    @Param('addressId') addressId: string,
    @Body() dto: AddAddressDto,
  ): Promise<{ message: string; color: string; address: UserAddress }> {
    return this.userService.updateAddress(userId, addressId, dto);
  }

  @Delete('address/:addressId')
  deleteAddress(
    @UserId() userId: string,
    @Param('addressId') addressId: string,
  ): Promise<{ message: string; color: string; addresses: UserAddress[] }> {
    return this.userService.deleteAddress(userId, addressId);
  }

  @Patch('address/:addressId/default')
  setDefaultAddress(
    @UserId() userId: string,
    @Param('addressId') addressId: string,
  ): Promise<{ message: string; color: string; addresses: UserAddress[] }> {
    return this.userService.setDefaultAddress(userId, addressId);
  }

  @Patch('status')
  updateStatus(
    @UserId() userId: string,
    @Body('status') status: string,
  ): Promise<{ message: string; color: string; status: string }> {
    return this.userService.updateStatus(userId, status);
  }

  @Get('search')
  searchUsers(@Query() query: Partial<UserProfile>): Promise<UserProfile[]> {
    return this.userService.searchUsers(query);
  }

  @Patch('password')
  updatePassword(
    @UserId() userId: string,
    @Body('newPassword') newPassword: string,
  ): Promise<{ message: string; color: string }> {
    return this.userService.updatePassword(userId, newPassword);
  }

  @Patch('deactivate')
  deactivateAccount(@UserId() userId: string): Promise<{ message: string; color: string }> {
    return this.userService.deactivateAccount(userId);
  }
}
