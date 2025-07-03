import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as supertest from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { CategoryModule } from './category.module';
import { Server } from 'http';

// Define types for category responses
interface CategoryResponse {
  _id: string;
  name: string;
  slug: string;
  isActive: boolean;
  sortOrder: number;
  productCount: number;
  parentCategory?: string;
  createdAt: string;
  updatedAt: string;
}

describe('CategoryController (integration)', () => {
  let app: INestApplication;
  let mongod: MongoMemoryServer;
  let uri: string;
  let server: Server;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    uri = mongod.getUri();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule.forRoot(uri), CategoryModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    await app.init();
    server = app.getHttpServer() as Server;
  });

  afterAll(async () => {
    await app.close();
    await mongod.stop();
  });

  it('/categories (POST, GET, PATCH, DELETE)', async () => {
    // Create
    const createDto = {
      name: 'TestCat',
      slug: 'test-cat',
    };
    const response = await supertest(server).post('/categories').send(createDto).expect(201);
    const created = response.body as { data: CategoryResponse; notification: any };
    if (!created.data) {
      // Print the full response for debugging

      console.log('Create category response:', response.body);
      throw new Error('Category creation failed: ' + JSON.stringify(response.body));
    }
    expect(created.data).toBeDefined();
    expect(created.data.name).toBe(createDto.name);
    expect(created.data.slug).toBe('testcat');
    expect(typeof created.data.isActive).toBe('boolean');
    expect(typeof created.data.sortOrder).toBe('number');
    expect(typeof created.data.productCount).toBe('number');
    expect(typeof created.data.createdAt).toBe('string');
    expect(typeof created.data.updatedAt).toBe('string');

    // Get all
    const allRes = await supertest(server).get('/categories').expect(200);
    const all = allRes.body as { data: CategoryResponse[]; notification: any };
    expect(Array.isArray(all.data)).toBe(true);
    expect(all.data.length).toBe(1);

    // Get one
    const oneRes = await supertest(server).get(`/categories/${created.data._id}`).expect(200);
    const one = oneRes.body as { data: CategoryResponse; notification: any };
    expect(one.data._id).toBe(created.data._id);

    // Update
    const updateDto = { name: 'UpdatedCat' };
    const updatedRes = await supertest(server)
      .patch(`/categories/${created.data._id}`)
      .send(updateDto)
      .expect(200);
    const updated = updatedRes.body as { data: CategoryResponse; notification: any };
    expect(updated.data.name).toBe(updateDto.name);

    // Delete
    await supertest(server).delete(`/categories/${created.data._id}`).expect(204);

    // Should not find after delete
    await supertest(server).get(`/categories/${created.data._id}`).expect(404);
  });
});
