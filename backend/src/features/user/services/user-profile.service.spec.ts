import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserProfileService } from './user-profile.service';
import { User, UserDocument, AddressType, UserRole, UserStatus } from '../schemas/user.schema';
import { NotificationService } from '../../../shared/notification';
import { UpdateUserProfileDto, AddAddressDto, ChangePasswordDto } from '../dto';

// Mock bcrypt module
jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

import * as bcrypt from 'bcryptjs';

// Type the mocked functions
const mockBcryptCompare = bcrypt.compare as jest.MockedFunction<typeof bcrypt.compare>;
const mockBcryptHash = bcrypt.hash as jest.MockedFunction<typeof bcrypt.hash>;

describe('UserProfileService', () => {
  let service: UserProfileService;
  let userModel: jest.Mocked<Model<UserDocument>>;

  const mockUser = {
    _id: new Types.ObjectId(),
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'hashedPassword',
    role: 'user',
    isActive: true,
    emailVerified: true,
    addresses: [],
    save: jest.fn(),
    toObject: jest.fn().mockReturnThis(),
  };

  const mockNotificationService = {
    notifySuccess: jest.fn().mockReturnValue({
      type: 'success',
      message: 'Success',
    }),
    notifyError: jest.fn().mockReturnValue({
      type: 'error',
      message: 'Error',
    }),
    notifyWarning: jest.fn().mockReturnValue({
      type: 'warning',
      message: 'Warning',
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserProfileService,
        {
          provide: getModelToken(User.name),
          useValue: {
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
          },
        },
        {
          provide: NotificationService,
          useValue: mockNotificationService,
        },
      ],
    }).compile();

    service = module.get<UserProfileService>(UserProfileService);
    userModel = module.get(getModelToken(User.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockBcryptCompare.mockReset();
    mockBcryptHash.mockReset();
  });

  // Helper function to create proper mock query
  const createMockQuery = (returnValue: any) => ({
    select: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue(returnValue),
  });

  describe('getUserProfile', () => {
    it('should return user profile successfully', async () => {
      const userId = mockUser._id.toString();
      const mockQuery = createMockQuery(mockUser);

      (userModel.findById as jest.Mock).mockReturnValue(mockQuery);

      const result = await service.getUserProfile(userId);

      expect(result.data).toEqual(mockUser);
      expect(result.notification.type).toBe('success');
    });

    it('should return error for invalid user ID', async () => {
      const result = await service.getUserProfile('invalid-id');

      expect(result.data).toBeUndefined();
      expect(result.notification.type).toBe('error');
    });

    it('should return error when user not found', async () => {
      const userId = new Types.ObjectId().toString();
      const mockQuery = createMockQuery(null);

      (userModel.findById as jest.Mock).mockReturnValue(mockQuery);

      const result = await service.getUserProfile(userId);

      expect(result.data).toBeUndefined();
      expect(result.notification.type).toBe('error');
    });
  });

  describe('updateProfile', () => {
    it('should update profile successfully', async () => {
      const userId = mockUser._id.toString();
      const updateDto: UpdateUserProfileDto = {
        firstName: 'Jane',
        lastName: 'Smith',
      };

      const updatedUser = { ...mockUser, ...updateDto };
      const mockQuery = createMockQuery(updatedUser);

      (userModel.findByIdAndUpdate as jest.Mock).mockReturnValue(mockQuery);

      const result = await service.updateProfile(userId, updateDto);

      expect(result.data).toBe(updatedUser);
      expect(result.notification.type).toBe('success');
    });

    it('should return error for invalid user ID', async () => {
      const updateDto: UpdateUserProfileDto = { firstName: 'Jane' };

      const result = await service.updateProfile('invalid-id', updateDto);

      expect(result.data).toBeUndefined();
      expect(result.notification.type).toBe('error');
    });
  });

  describe('addAddress', () => {
    it('should add address successfully', async () => {
      const userId = mockUser._id.toString();
      const addressDto: AddAddressDto = {
        type: AddressType.SHIPPING,
        street: '123 Main St',
        city: 'Anytown',
        state: 'ST',
        zipCode: '12345',
        country: 'USA',
        isDefault: true,
      };

      const userWithNewAddress = {
        ...mockUser,
        addresses: [addressDto],
        save: jest.fn().mockResolvedValue(true),
      };

      const mockFindQuery = createMockQuery(userWithNewAddress);
      const mockSelectQuery = createMockQuery(userWithNewAddress);

      (userModel.findById as jest.Mock)
        .mockReturnValueOnce(mockFindQuery)
        .mockReturnValueOnce(mockSelectQuery);

      const result = await service.addAddress(userId, addressDto);

      expect(result.data).toBeTruthy();
      expect(result.notification.type).toBe('success');
    });

    it('should return error for invalid user ID', async () => {
      const addressDto: AddAddressDto = {
        type: AddressType.SHIPPING,
        street: '123 Main St',
        city: 'Anytown',
        state: 'ST',
        zipCode: '12345',
        country: 'USA',
      };

      const result = await service.addAddress('invalid-id', addressDto);

      expect(result.data).toBeUndefined();
      expect(result.notification.type).toBe('error');
    });
  });

  describe('changePassword', () => {
    it('should change password successfully', async () => {
      const userId = mockUser._id.toString();
      const changePasswordDto: ChangePasswordDto = {
        currentPassword: 'oldPassword',
        newPassword: 'newPassword',
      };

      const userWithPassword = { ...mockUser, password: 'hashedOldPassword' };
      const mockQuery = {
        select: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(userWithPassword),
      };

      (userModel.findById as jest.Mock).mockReturnValue(mockQuery);
      mockBcryptCompare.mockResolvedValue(true as never);
      mockBcryptHash.mockResolvedValue('hashedNewPassword' as never);
      userWithPassword.save = jest.fn().mockResolvedValue(userWithPassword);

      const result = await service.changePassword(userId, changePasswordDto);

      expect(result.notification.type).toBe('success');
      expect(mockBcryptCompare).toHaveBeenCalledWith('oldPassword', 'hashedOldPassword');
    });

    it('should return error for incorrect current password', async () => {
      const userId = mockUser._id.toString();
      const changePasswordDto: ChangePasswordDto = {
        currentPassword: 'wrongPassword',
        newPassword: 'newPassword',
      };

      const userWithPassword = { ...mockUser, password: 'hashedOldPassword' };
      const mockQuery = createMockQuery(userWithPassword);

      (userModel.findById as jest.Mock).mockReturnValue(mockQuery);
      mockBcryptCompare.mockResolvedValue(false as never);

      const result = await service.changePassword(userId, changePasswordDto);

      expect(result.notification.type).toBe('error');
    });
  });

  describe('setDefaultAddress', () => {
    it('should set default address successfully', async () => {
      const userId = mockUser._id.toString();
      const setDefaultDto = { addressIndex: 1 };

      const userWithAddresses = {
        ...mockUser,
        addresses: [
          { type: AddressType.SHIPPING, isDefault: true },
          { type: AddressType.BILLING, isDefault: false },
        ],
        save: jest.fn().mockResolvedValue(mockUser),
      };

      const mockQuery1 = { exec: jest.fn().mockResolvedValue(userWithAddresses) };
      const mockQuery2 = createMockQuery(userWithAddresses);
      userModel.findById = jest
        .fn()
        .mockReturnValueOnce(mockQuery1)
        .mockReturnValueOnce(mockQuery2);

      const result = await service.setDefaultAddress(userId, setDefaultDto);

      expect(result.notification.type).toBe('success');
      expect(userWithAddresses.addresses[1].isDefault).toBe(true);
      expect(userWithAddresses.addresses[0].isDefault).toBe(false);
    });

    it('should return error for invalid address index', async () => {
      const userId = mockUser._id.toString();
      const setDefaultDto = { addressIndex: 5 };

      const userWithAddresses = {
        ...mockUser,
        addresses: [{ type: AddressType.SHIPPING, isDefault: true }],
      };

      userModel.findById = jest.fn().mockResolvedValue(userWithAddresses);

      const result = await service.setDefaultAddress(userId, setDefaultDto);

      expect(result.notification.type).toBe('error');
    });
  });

  describe('searchUsers', () => {
    it('should search users successfully', async () => {
      const searchDto = {
        search: 'john',
        page: 1,
        limit: 10,
      };

      const mockUsers = [mockUser];
      const mockQuery = {
        select: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockUsers),
      };

      userModel.find = jest.fn().mockReturnValue(mockQuery);
      userModel.countDocuments = jest.fn().mockResolvedValue(1);

      const result = await service.searchUsers(searchDto);

      expect(result.notification.type).toBe('success');
      expect(result.data?.users).toHaveLength(1);
      expect(result.data?.total).toBe(1);
    });

    it('should handle search with filters', async () => {
      const searchDto = {
        role: UserRole.ADMIN,
        status: UserStatus.ACTIVE,
        isActive: true,
        emailVerified: true,
        page: 1,
        limit: 5,
      };

      const mockQuery = {
        select: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue([]),
      };

      const findMock = jest.fn().mockReturnValue(mockQuery);
      userModel.find = findMock;
      userModel.countDocuments = jest.fn().mockResolvedValue(0);

      const result = await service.searchUsers(searchDto);

      expect(result.notification.type).toBe('success');
      expect(findMock).toHaveBeenCalledWith({
        role: UserRole.ADMIN,
        status: UserStatus.ACTIVE,
        isActive: true,
        emailVerified: true,
      });
    });
  });

  describe('updateUserStatus', () => {
    it('should update user status successfully', async () => {
      const userId = mockUser._id.toString();
      const statusDto = {
        status: UserStatus.ACTIVE,
        isActive: true,
      };

      const mockQuery = createMockQuery(mockUser);
      const findByIdAndUpdateMock = jest.fn().mockReturnValue(mockQuery);
      userModel.findByIdAndUpdate = findByIdAndUpdateMock;

      const result = await service.updateUserStatus(userId, statusDto);

      expect(result.notification.type).toBe('success');
      expect(findByIdAndUpdateMock).toHaveBeenCalledWith(
        userId,
        { status: UserStatus.ACTIVE, isActive: true },
        { new: true },
      );
    });

    it('should show warning for deactivated user', async () => {
      const userId = mockUser._id.toString();
      const statusDto = {
        status: UserStatus.SUSPENDED,
        isActive: false,
      };

      const mockQuery = createMockQuery(mockUser);
      userModel.findByIdAndUpdate = jest.fn().mockReturnValue(mockQuery);
      mockNotificationService.notifyWarning = jest.fn().mockReturnValue({
        type: 'warning',
        message: 'User account has been deactivated',
      });

      const result = await service.updateUserStatus(userId, statusDto);

      expect(result.notification.type).toBe('warning');
    });
  });

  describe('deactivateUser', () => {
    it('should deactivate user successfully', async () => {
      const userId = mockUser._id.toString();

      const mockQuery = createMockQuery(mockUser);
      const findByIdAndUpdateMock = jest.fn().mockReturnValue(mockQuery);
      userModel.findByIdAndUpdate = findByIdAndUpdateMock;
      mockNotificationService.notifyWarning = jest.fn().mockReturnValue({
        type: 'warning',
        message: 'User account has been deactivated',
      });

      const result = await service.deactivateUser(userId);

      expect(result.notification.type).toBe('warning');
      expect(findByIdAndUpdateMock).toHaveBeenCalledWith(
        userId,
        { isActive: false, status: UserStatus.SUSPENDED },
        { new: true },
      );
    });
  });

  describe('activateUser', () => {
    it('should activate user successfully', async () => {
      const userId = mockUser._id.toString();

      const mockQuery = createMockQuery(mockUser);
      const findByIdAndUpdateMock = jest.fn().mockReturnValue(mockQuery);
      userModel.findByIdAndUpdate = findByIdAndUpdateMock;

      const result = await service.activateUser(userId);

      expect(result.notification.type).toBe('success');
      expect(findByIdAndUpdateMock).toHaveBeenCalledWith(
        userId,
        { isActive: true, status: UserStatus.ACTIVE },
        { new: true },
      );
    });
  });
});
