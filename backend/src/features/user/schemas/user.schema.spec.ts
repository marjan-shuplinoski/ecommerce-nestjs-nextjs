import { Test } from '@nestjs/testing';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserRole, UserSchema, Address, AddressType, UserStatus } from './user.schema';
import * as bcrypt from 'bcryptjs';
import { MongoMemoryServer } from 'mongodb-memory-server';

// Increase Jest timeout for slow MongoDB startup
jest.setTimeout(30000);

describe('User Schema', () => {
  let mongod: MongoMemoryServer;
  let userModel: Model<User>;
  let module: any;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
    }).compile();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    userModel = module.get(getModelToken(User.name));
  });

  afterAll(async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    if (mongod && typeof (mongod as any).stop === 'function') await (mongod as any).stop();
    const mongoose = await import('mongoose');
    await mongoose.disconnect();
  });

  it('should create user with all required fields and defaults', async () => {
    const user = await userModel.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password',
    });
    expect(user.firstName).toBe('John');
    expect(user.lastName).toBe('Doe');
    expect(user.email).toBe('john@example.com');
    expect(user.role).toBe(UserRole.CUSTOMER);
    expect(user.status).toBe(UserStatus.ACTIVE);
    expect(user.isActive).toBe(true);
    expect(user.emailVerified).toBe(false);
    expect(user.addresses).toEqual([]);
  });

  it('should hash password before save', async () => {
    const plainPassword = 'mysecret';
    const user = await userModel.create({
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      password: plainPassword,
    });
    expect(user.password).not.toBe(plainPassword);
    expect(await bcrypt.compare(plainPassword, user.password)).toBe(true);
  });

  it('should enforce unique email index', async () => {
    await userModel.create({
      firstName: 'A',
      lastName: 'B',
      email: 'unique@example.com',
      password: 'password',
    });
    await expect(
      userModel.create({
        firstName: 'C',
        lastName: 'D',
        email: 'unique@example.com',
        password: 'password',
      }),
    ).rejects.toThrow();
  });

  it('should require all address fields and enums', async () => {
    const address: Address = {
      type: AddressType.SHIPPING,
      street: '123 Main St',
      city: 'Metropolis',
      state: 'NY',
      zipCode: '12345',
      country: 'Freedonia',
      isDefault: true,
    };
    const user = await userModel.create({
      firstName: 'Alice',
      lastName: 'Wonder',
      email: 'alice@example.com',
      password: 'password',
      addresses: [address],
      role: UserRole.SELLER,
      status: UserStatus.SUSPENDED,
      phoneNumber: '+1234567890',
      dateOfBirth: new Date('1990-01-01'),
      isActive: false,
      emailVerified: true,
      avatar: 'https://example.com/avatar.png',
    });
    expect(user.addresses[0].type).toBe(AddressType.SHIPPING);
    expect(user.addresses[0].isDefault).toBe(true);
    expect(user.role).toBe(UserRole.SELLER);
    expect(user.status).toBe(UserStatus.SUSPENDED);
    expect(user.phoneNumber).toBe('+1234567890');
    expect(user.dateOfBirth).toBeInstanceOf(Date);
    expect(user.isActive).toBe(false);
    expect(user.emailVerified).toBe(true);
    expect(user.avatar).toBe('https://example.com/avatar.png');
  });
});
