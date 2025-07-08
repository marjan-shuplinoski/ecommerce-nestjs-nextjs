import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';

interface Notification {
  type: 'success' | 'error';
  message: string;
  code?: string;
}

interface Order {
  _id: string;
  status: string;
  [key: string]: unknown;
}

interface OrderResponse {
  data: Order;
  notification: Notification;
}

interface OrdersListResponse {
  data: Order[];
  notification: Notification;
}

// Mock user tokens (should be generated via auth flow in real E2E)
const userToken = 'USER_JWT_TOKEN';
const adminToken = 'ADMIN_JWT_TOKEN';

// TODO: Replace with dynamic user/admin creation and login for real E2E

describe('OrderController (e2e)', () => {
  let app: INestApplication<any>; // Explicitly type as any for supertest compatibility
  let createdOrderId: string;

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

  it('POST /orders (user) - should create order and receive notification', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const res = await request(app.getHttpServer())
      .post('/orders')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ cartId: 'mockCartId', address: 'Test Address' })
      .expect(201);
    const body = res.body as OrderResponse;
    expect(body.data._id).toBeDefined();
    expect(body.notification.type).toBe('success');
    createdOrderId = body.data._id;
  });

  it('GET /orders (user) - should get user orders', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const res = await request(app.getHttpServer())
      .get('/orders')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);
    const body = res.body as OrdersListResponse;
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.notification.type).toBe('success');
  });

  it('GET /orders/:id (user) - should get order by id', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const res = await request(app.getHttpServer())
      .get(`/orders/${createdOrderId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);
    const body = res.body as OrderResponse;
    expect(body.data._id).toBe(createdOrderId);
    expect(body.notification.type).toBe('success');
  });

  it('PATCH /orders/:id/status (admin) - should update order status (RBAC)', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const res = await request(app.getHttpServer())
      .patch(`/orders/${createdOrderId}/status`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'SHIPPED' })
      .expect(200);
    const body = res.body as OrderResponse;
    expect(body.data.status).toBe('SHIPPED');
    expect(body.notification.type).toBe('success');
  });

  it('PATCH /orders/:id/status (user) - should fail RBAC for non-admin', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await request(app.getHttpServer())
      .patch(`/orders/${createdOrderId}/status`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ status: 'DELIVERED' })
      .expect(403);
  });

  it('DELETE /orders/:id (admin) - should delete order (RBAC)', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const res = await request(app.getHttpServer())
      .delete(`/orders/${createdOrderId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
    const body = res.body as { notification: Notification };
    expect(body.notification.type).toBe('success');
  });

  it('GET /orders/:id (user) - should return not found after delete', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await request(app.getHttpServer())
      .get(`/orders/${createdOrderId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(404);
  });

  it('POST /orders (unauthenticated) - should fail with 401', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await request(app.getHttpServer())
      .post('/orders')
      .send({ cartId: 'mockCartId', address: 'Test Address' })
      .expect(401);
  });
  // Add more E2E tests for payment confirmation, notification edge cases, etc.
});
