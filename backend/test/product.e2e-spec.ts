import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';
import { Response } from 'supertest';

interface ProductResponse {
  data?: {
    _id?: string;
    name?: string;
    price?: number;
    category?: string;
    [key: string]: any;
  };
  notification: {
    type: 'success' | 'error';
    message: string;
    code?: string;
  };
  total?: number;
}

describe('ProductController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await disconnect();
  });

  it('POST /products - should create a product', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const res = await request(app.getHttpServer())
      .post('/products')
      .send({ name: 'E2E Product', price: 123.45, category: 'e2e-category' })
      .expect(201);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body: ProductResponse = res.body;
    expect(body.data?._id).toBeDefined();
    expect(body.notification.type).toBe('success');
    createdId = body.data?._id as string;
  });

  it('GET /products/:id - should get product by id', async () => {
    /*
     * The following line triggers a @typescript-eslint/no-unsafe-argument warning because
     * app.getHttpServer() returns an untyped value, but this is safe and expected in E2E tests.
     * See: https://github.com/nestjs/nest/issues/10297
     */
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const res = await request(app.getHttpServer()).get(`/products/${createdId}`).expect(200);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body: ProductResponse = res.body;
    expect(body.data?.name).toBe('E2E Product');
    expect(body.notification.type).toBe('success');
  });

  it('PUT /products/:id - should update product', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const res = await request(app.getHttpServer())
      .put(`/products/${createdId}`)
      .send({ price: 222 })
      .expect(200);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body: ProductResponse = res.body;
    expect(body.data?.price).toBe(222);
    expect(body.notification.type).toBe('success');
  });

  it('GET /products - should filter products', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const res = await request(app.getHttpServer())
      .get(`/products?category=e2e-category`)
      .expect(200);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body: ProductResponse = res.body;
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.notification.type).toBe('success');
  });

  it('DELETE /products/:id - should delete product', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const res = await request(app.getHttpServer()).delete(`/products/${createdId}`).expect(200);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body: ProductResponse = res.body;
    expect(body.notification.type).toBe('success');
  });

  it('GET /products/:id - should return not found after delete', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const res = await request(app.getHttpServer()).get(`/products/${createdId}`).expect(404);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body: ProductResponse = res.body;
    expect(body.notification.type).toBe('error');
  });
});
