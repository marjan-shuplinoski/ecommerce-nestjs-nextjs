import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { AddAddressDto } from '../dto/add-address.dto';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw NotFoundException for getProfile', async () => {
    await expect(service.getProfile('nonexistent')).rejects.toThrow();
  });

  it('should throw for updateProfile with invalid data', async () => {
    await expect(service.updateProfile('id', {} as UpdateProfileDto)).rejects.toThrow();
  });

  it('should throw for addAddress with invalid data', async () => {
    await expect(service.addAddress('id', {} as AddAddressDto)).rejects.toThrow();
  });

  // ...more tests for each method and edge case...
});
