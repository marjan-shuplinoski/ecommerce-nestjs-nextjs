import { Injectable } from '@nestjs/common';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { AddAddressDto } from '../dto/add-address.dto';
import { UserProfile, UserAddress } from '../types/user.types';

@Injectable()
export class UserService {
  // Mocked user data store for demonstration
  private users = new Map<string, UserProfile>();

  async getProfile(userId: string): Promise<UserProfile> {
    await Promise.resolve();
    const user = this.users.get(userId);
    if (!user) throw new Error('User not found');
    return user;
  }

  async updateProfile(
    userId: string,
    dto: UpdateProfileDto,
  ): Promise<{ message: string; color: string; user: UserProfile }> {
    await Promise.resolve();
    const user = this.users.get(userId);
    if (!user) throw new Error('User not found');
    if (dto.email && dto.email === 'exists@email.com') {
      throw new Error('Email already exists');
    }
    Object.assign(user, dto);
    return { message: 'Profile updated', color: 'green', user };
  }

  async addAddress(
    userId: string,
    dto: AddAddressDto,
  ): Promise<{ message: string; color: string; addresses: UserAddress[] }> {
    await Promise.resolve();
    const user = this.users.get(userId);
    if (!user) throw new Error('User not found');
    const address: UserAddress = { id: Math.random().toString(36).slice(2), ...dto } as UserAddress;
    user.addresses.push(address);
    return { message: 'Address added', color: 'green', addresses: user.addresses };
  }

  async updateAddress(
    userId: string,
    addressId: string,
    dto: AddAddressDto,
  ): Promise<{ message: string; color: string; address: UserAddress }> {
    await Promise.resolve();
    const user = this.users.get(userId);
    if (!user) throw new Error('User not found');
    const idx = user.addresses.findIndex((a) => a.id === addressId);
    if (idx === -1) throw new Error('Address not found');
    user.addresses[idx] = { ...user.addresses[idx], ...dto } as UserAddress;
    return { message: 'Address updated', color: 'green', address: user.addresses[idx] };
  }

  async deleteAddress(
    userId: string,
    addressId: string,
  ): Promise<{ message: string; color: string; addresses: UserAddress[] }> {
    await Promise.resolve();
    const user = this.users.get(userId);
    if (!user) throw new Error('User not found');
    user.addresses = user.addresses.filter((a) => a.id !== addressId);
    return { message: 'Address deleted', color: 'green', addresses: user.addresses };
  }

  async setDefaultAddress(
    userId: string,
    addressId: string,
  ): Promise<{ message: string; color: string; addresses: UserAddress[] }> {
    await Promise.resolve();
    const user = this.users.get(userId);
    if (!user) throw new Error('User not found');
    user.addresses = user.addresses.map((a) => ({ ...a, isDefault: a.id === addressId }));
    return { message: 'Default address set', color: 'green', addresses: user.addresses };
  }

  async updateStatus(
    userId: string,
    status: string,
  ): Promise<{ message: string; color: string; status: string }> {
    await Promise.resolve();
    const user = this.users.get(userId);
    if (!user) throw new Error('User not found');
    user.status = status;
    const color = status === 'deactivated' ? 'orange' : 'green';
    return { message: 'Status updated', color, status };
  }

  async searchUsers(query: Partial<UserProfile>): Promise<UserProfile[]> {
    await Promise.resolve();
    return Array.from(this.users.values()).filter((u) => {
      if (query.email && u.email !== query.email) return false;
      if (query.status && u.status !== query.status) return false;
      return true;
    });
  }

  async updatePassword(
    userId: string,
    newPassword: string,
  ): Promise<{ message: string; color: string }> {
    await Promise.resolve();
    const user = this.users.get(userId);
    if (!user) throw new Error('User not found');
    user.password = newPassword;
    return { message: 'Password updated', color: 'green' };
  }

  async deactivateAccount(userId: string): Promise<{ message: string; color: string }> {
    await Promise.resolve();
    const user = this.users.get(userId);
    if (!user) throw new Error('User not found');
    user.status = 'deactivated';
    return { message: 'Account deactivated', color: 'orange' };
  }
}
