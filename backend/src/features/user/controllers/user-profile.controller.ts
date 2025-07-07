import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Body,
  Param,
  Req,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { Request } from 'express';
import { UserProfileService } from '../services';
import {
  UpdateUserProfileDto,
  AddAddressDto,
  UpdateAddressDto,
  ChangePasswordDto,
  AdminUserSearchDto,
  UpdateUserStatusDto,
  SetDefaultAddressDto,
} from '../dto';
import { FileUploadService } from '../../../shared/services/file-upload.service';
import { RequestUser } from '../../../shared/types/request-user.interface';

// TODO: Import these guards when they're implemented
// import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
// import { RolesGuard } from '../../auth/guards/roles.guard';
// import { Roles } from '../../auth/decorators/roles.decorator';

interface AuthenticatedRequest extends Request {
  user: RequestUser;
}

@ApiTags('User Profile')
@ApiBearerAuth()
@Controller('users')
export class UserProfileController {
  constructor(
    private userProfileService: UserProfileService,
    private fileUploadService: FileUploadService,
  ) {}

  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get('me')
  async getProfile(@Req() req: AuthenticatedRequest) {
    return this.userProfileService.getUserProfile(req.user.id);
  }

  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Put('me')
  async updateProfile(@Req() req: AuthenticatedRequest, @Body() updateDto: UpdateUserProfileDto) {
    return this.userProfileService.updateProfile(req.user.id, updateDto);
  }

  @ApiOperation({ summary: 'Add new address' })
  @ApiResponse({ status: 201, description: 'Address added successfully' })
  @ApiResponse({ status: 400, description: 'Invalid address data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post('me/addresses')
  async addAddress(@Req() req: AuthenticatedRequest, @Body() addressDto: AddAddressDto) {
    return this.userProfileService.addAddress(req.user.id, addressDto);
  }

  @ApiOperation({ summary: 'Update existing address' })
  @ApiResponse({ status: 200, description: 'Address updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid address data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Address not found' })
  @Put('me/addresses/:index')
  async updateAddress(
    @Req() req: AuthenticatedRequest,
    @Param('index', ParseIntPipe) index: number,
    @Body() updateDto: UpdateAddressDto,
  ) {
    return this.userProfileService.updateAddress(req.user.id, index, updateDto);
  }

  @ApiOperation({ summary: 'Remove address' })
  @ApiResponse({ status: 200, description: 'Address removed successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Address not found' })
  @Delete('me/addresses/:index')
  async removeAddress(
    @Req() req: AuthenticatedRequest,
    @Param('index', ParseIntPipe) index: number,
  ) {
    return this.userProfileService.removeAddress(req.user.id, index);
  }

  @ApiOperation({ summary: 'Change password' })
  @ApiResponse({ status: 200, description: 'Password changed successfully' })
  @ApiResponse({ status: 400, description: 'Invalid password data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Put('me/password')
  async changePassword(
    @Req() req: AuthenticatedRequest,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.userProfileService.changePassword(req.user.id, changePasswordDto);
  }

  @ApiOperation({ summary: 'Upload profile avatar' })
  @ApiResponse({ status: 200, description: 'Avatar uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Invalid file' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiConsumes('multipart/form-data')
  @Post('me/avatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return cb(new Error('Invalid file type'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    }),
  )
  async uploadAvatar(@Req() req: AuthenticatedRequest, @UploadedFile() file: Express.Multer.File) {
    try {
      const avatarPath = await this.fileUploadService.uploadProfileImage(file);

      // Update user profile with new avatar path
      return this.userProfileService.updateProfile(req.user.id, { avatar: avatarPath });
    } catch (error) {
      return {
        notification: {
          type: 'error' as const,
          message: error instanceof Error ? error.message : 'Failed to upload avatar',
          code: 'AVATAR_UPLOAD_ERROR',
        },
      };
    }
  }

  @ApiOperation({ summary: 'Set default address' })
  @ApiResponse({ status: 200, description: 'Default address set successfully' })
  @ApiResponse({ status: 400, description: 'Invalid address index' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Address not found' })
  @Put('me/addresses/default')
  async setDefaultAddress(
    @Req() req: AuthenticatedRequest,
    @Body() setDefaultDto: SetDefaultAddressDto,
  ) {
    return this.userProfileService.setDefaultAddress(req.user.id, setDefaultDto);
  }

  // Admin endpoints
  @ApiOperation({ summary: 'Search and filter users (Admin only)' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
  // TODO: Uncomment when auth guards are implemented
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  @Get('admin/search')
  async searchUsers(@Query() searchDto: AdminUserSearchDto) {
    return this.userProfileService.searchUsers(searchDto);
  }

  @ApiOperation({ summary: 'Update user status (Admin only)' })
  @ApiResponse({ status: 200, description: 'User status updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid status data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
  @ApiResponse({ status: 404, description: 'User not found' })
  // TODO: Uncomment when auth guards are implemented
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  @Put('admin/:userId/status')
  async updateUserStatus(@Param('userId') userId: string, @Body() statusDto: UpdateUserStatusDto) {
    return this.userProfileService.updateUserStatus(userId, statusDto);
  }

  @ApiOperation({ summary: 'Deactivate user account (Admin only)' })
  @ApiResponse({ status: 200, description: 'User deactivated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
  @ApiResponse({ status: 404, description: 'User not found' })
  // TODO: Uncomment when auth guards are implemented
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  @Put('admin/:userId/deactivate')
  async deactivateUser(@Param('userId') userId: string) {
    return this.userProfileService.deactivateUser(userId);
  }

  @ApiOperation({ summary: 'Activate user account (Admin only)' })
  @ApiResponse({ status: 200, description: 'User activated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
  @ApiResponse({ status: 404, description: 'User not found' })
  // TODO: Uncomment when auth guards are implemented
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  @Put('admin/:userId/activate')
  async activateUser(@Param('userId') userId: string) {
    return this.userProfileService.activateUser(userId);
  }
}
