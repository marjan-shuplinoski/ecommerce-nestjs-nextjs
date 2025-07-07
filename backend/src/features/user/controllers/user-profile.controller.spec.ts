/* eslint-disable @typescript-eslint/unbound-method, @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { UserProfileController } from './user-profile.controller';
import { UserProfileService } from '../services/user-profile.service';
import { FileUploadService } from '../../../shared/services/file-upload.service';
import { AddressType, UserRole, UserStatus } from '../schemas/user.schema';
import { UpdateUserProfileDto, AddAddressDto, ChangePasswordDto } from '../dto';
import { Request } from 'express';
import { RequestUser } from '../../../shared/types/request-user.interface';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { NotificationService } from '../../../shared/notification';

// Create proper type for AuthenticatedRequest
interface AuthenticatedRequest extends Request {
  user: RequestUser;
}

describe('UserProfileController', () => {
  let controller: UserProfileController;
  let userProfileService: jest.Mocked<UserProfileService>;
  let fileUploadService: jest.Mocked<FileUploadService>;

  const mockUser = {
    _id: 'user123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'hashedPassword',
    role: UserRole.CUSTOMER,
    addresses: [],
    isActive: true,
    emailVerified: true,
    status: UserStatus.ACTIVE,
  };

  const mockRequest: AuthenticatedRequest = {
    user: {
      id: 'user123',
      email: 'john@example.com',
      isAdmin: false,
    },
  } as AuthenticatedRequest;

  const mockSuccessResponse = {
    data: mockUser as any,
    notification: {
      type: 'success' as const,
      message: 'Operation successful',
    },
  };

  beforeEach(async () => {
    const mockUserProfileService = {
      getUserProfile: jest.fn(),
      updateProfile: jest.fn(),
      addAddress: jest.fn(),
      updateAddress: jest.fn(),
      removeAddress: jest.fn(),
      changePassword: jest.fn(),
      setDefaultAddress: jest.fn(),
      searchUsers: jest.fn(),
      updateUserStatus: jest.fn(),
      deactivateUser: jest.fn(),
      activateUser: jest.fn(),
    };

    const mockFileUploadService = {
      uploadProfileImage: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserProfileController],
      providers: [
        {
          provide: UserProfileService,
          useValue: mockUserProfileService,
        },
        {
          provide: FileUploadService,
          useValue: mockFileUploadService,
        },
        {
          provide: JwtAuthGuard,
          useValue: {
            canActivate: jest.fn(() => true),
          },
        },
        {
          provide: RolesGuard,
          useValue: {
            canActivate: jest.fn(() => true),
          },
        },
        {
          provide: Reflector,
          useValue: {
            getAllAndOverride: jest.fn(),
          },
        },
        {
          provide: NotificationService,
          useValue: {
            notifySuccess: jest.fn(),
            notifyError: jest.fn(),
            notifyWarning: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserProfileController>(UserProfileController);
    userProfileService = module.get(UserProfileService);
    fileUploadService = module.get(FileUploadService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getProfile', () => {
    it('should return user profile successfully', async () => {
      userProfileService.getUserProfile.mockResolvedValue(mockSuccessResponse);

      const result = await controller.getProfile(mockRequest);

      expect(result).toEqual(mockSuccessResponse);
      expect(userProfileService.getUserProfile).toHaveBeenCalledWith(mockRequest.user.id);
    });
  });

  describe('updateProfile', () => {
    it('should update profile successfully', async () => {
      const updateDto: UpdateUserProfileDto = {
        firstName: 'Jane',
        lastName: 'Smith',
      };

      userProfileService.updateProfile.mockResolvedValue(mockSuccessResponse);

      const result = await controller.updateProfile(mockRequest, updateDto);

      expect(result).toEqual(mockSuccessResponse);
      expect(userProfileService.updateProfile).toHaveBeenCalledWith(mockRequest.user.id, updateDto);
    });
  });

  describe('addAddress', () => {
    it('should add address successfully', async () => {
      const addressDto: AddAddressDto = {
        type: AddressType.SHIPPING,
        street: '123 Main St',
        city: 'Anytown',
        state: 'ST',
        zipCode: '12345',
        country: 'USA',
      };

      userProfileService.addAddress.mockResolvedValue(mockSuccessResponse);

      const result = await controller.addAddress(mockRequest, addressDto);

      expect(result).toEqual(mockSuccessResponse);
      expect(userProfileService.addAddress).toHaveBeenCalledWith(mockRequest.user.id, addressDto);
    });
  });

  describe('changePassword', () => {
    it('should change password successfully', async () => {
      const changePasswordDto: ChangePasswordDto = {
        currentPassword: 'oldPassword',
        newPassword: 'newPassword',
      };

      userProfileService.changePassword.mockResolvedValue(mockSuccessResponse);

      const result = await controller.changePassword(mockRequest, changePasswordDto);

      expect(result).toEqual(mockSuccessResponse);
      expect(userProfileService.changePassword).toHaveBeenCalledWith(
        mockRequest.user.id,
        changePasswordDto,
      );
    });
  });

  describe('uploadAvatar', () => {
    it('should upload avatar successfully', async () => {
      const mockFile = {
        fieldname: 'avatar',
        originalname: 'test.jpg',
        mimetype: 'image/jpeg',
        buffer: Buffer.from('test'),
        size: 1000,
      } as Express.Multer.File;

      const avatarPath = '/uploads/avatars/avatar-123.jpg';

      fileUploadService.uploadProfileImage.mockResolvedValue(avatarPath);
      userProfileService.updateProfile.mockResolvedValue(mockSuccessResponse);

      const result = await controller.uploadAvatar(mockRequest, mockFile);

      expect(result).toEqual(mockSuccessResponse);
      expect(fileUploadService.uploadProfileImage).toHaveBeenCalledWith(mockFile);
      expect(userProfileService.updateProfile).toHaveBeenCalledWith(mockRequest.user.id, {
        avatar: avatarPath,
      });
    });

    it('should handle file upload error', async () => {
      const mockFile = {
        fieldname: 'avatar',
        originalname: 'test.jpg',
        mimetype: 'image/jpeg',
        buffer: Buffer.from('test'),
        size: 1000,
      } as Express.Multer.File;

      fileUploadService.uploadProfileImage.mockRejectedValue(new Error('Upload failed'));

      const result = await controller.uploadAvatar(mockRequest, mockFile);

      // Check that we get some result (success or error response)
      expect(result).toBeDefined();
      expect(result.notification).toBeDefined();
      expect(result.notification.type).toBe('error');
      expect(result.notification.message).toBe('Upload failed');
      expect('code' in result.notification && result.notification.code).toBe('AVATAR_UPLOAD_ERROR');
    });
  });

  describe('setDefaultAddress', () => {
    it('should set default address successfully', async () => {
      const setDefaultDto = { addressIndex: 1 };
      userProfileService.setDefaultAddress.mockResolvedValue(mockSuccessResponse);

      const result = await controller.setDefaultAddress(mockRequest, setDefaultDto);

      expect(result).toEqual(mockSuccessResponse);
      expect(userProfileService.setDefaultAddress).toHaveBeenCalledWith(
        mockRequest.user.id,
        setDefaultDto,
      );
    });
  });

  describe('Admin endpoints', () => {
    describe('searchUsers', () => {
      it('should search users successfully', async () => {
        const searchDto = {
          search: 'john',
          page: 1,
          limit: 10,
        };

        const mockSearchResponse = {
          data: {
            users: [mockUser as any],
            total: 1,
            page: 1,
            limit: 10,
          },
          notification: {
            type: 'success' as const,
            message: 'Users retrieved successfully',
          },
        };

        userProfileService.searchUsers.mockResolvedValue(mockSearchResponse);

        const result = await controller.searchUsers(searchDto);

        expect(result).toEqual(mockSearchResponse);
        expect(userProfileService.searchUsers).toHaveBeenCalledWith(searchDto);
      });
    });

    describe('updateUserStatus', () => {
      it('should update user status successfully', async () => {
        const userId = 'user456';
        const statusDto = {
          status: UserStatus.ACTIVE,
          isActive: true,
        };

        userProfileService.updateUserStatus.mockResolvedValue(mockSuccessResponse);

        const result = await controller.updateUserStatus(userId, statusDto);

        expect(result).toEqual(mockSuccessResponse);
        expect(userProfileService.updateUserStatus).toHaveBeenCalledWith(userId, statusDto);
      });
    });

    describe('deactivateUser', () => {
      it('should deactivate user successfully', async () => {
        const userId = 'user456';
        const mockDeactivateResponse = {
          data: { ...mockUser, isActive: false, status: UserStatus.SUSPENDED } as any,
          notification: {
            type: 'warning' as const,
            message: 'User account has been deactivated',
            code: 'USER_DEACTIVATED',
          },
        };

        userProfileService.deactivateUser.mockResolvedValue(mockDeactivateResponse);

        const result = await controller.deactivateUser(userId);

        expect(result).toEqual(mockDeactivateResponse);
        expect(userProfileService.deactivateUser).toHaveBeenCalledWith(userId);
      });
    });

    describe('activateUser', () => {
      it('should activate user successfully', async () => {
        const userId = 'user456';
        const mockActivateResponse = {
          data: { ...mockUser, isActive: true, status: UserStatus.ACTIVE } as any,
          notification: {
            type: 'success' as const,
            message: 'User account has been activated',
          },
        };

        userProfileService.activateUser.mockResolvedValue(mockActivateResponse);

        const result = await controller.activateUser(userId);

        expect(result).toEqual(mockActivateResponse);
        expect(userProfileService.activateUser).toHaveBeenCalledWith(userId);
      });
    });
  });
});
