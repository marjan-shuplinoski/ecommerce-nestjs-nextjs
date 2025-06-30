import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../database.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';

describe('DatabaseModule', () => {
  it('should compile the module and provide Mongoose connection', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env',
        }),
        DatabaseModule,
      ],
    }).compile();
    expect(module).toBeDefined();
    expect(module.get(MongooseModule)).toBeDefined();
  });
});

afterAll(async () => {
  try {
    await mongoose.disconnect();
    await new Promise((resolve) => setTimeout(resolve, 100)); // allow for graceful shutdown
  } catch (err) {
    console.error('Error during mongoose disconnect:', err);
  }
});
