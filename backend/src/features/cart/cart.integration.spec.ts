import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Cart, CartSchema } from './schemas/cart.schema';
import { CartItem, CartItemSchema } from './schemas/cart-item.schema';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

describe('CartController (integration)', () => {
  let app: INestApplication;
  let mongod: MongoMemoryServer;
  let cartId: string;
  let productId: string;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([
          { name: Cart.name, schema: CartSchema },
          { name: CartItem.name, schema: CartItemSchema },
        ]),
      ],
      controllers: [CartController],
      providers: [CartService],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    await app.init();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
    await app.close();
  });

  it('POST /api/cart - create cart', async () => {
    const res = await request(app.getHttpServer() as import('http').Server)
      .post('/cart')
      .send({ isGuest: true });
    expect(res.status).toBe(201);
    const body = res.body as { _id: string };
    expect(body).toHaveProperty('_id');
    cartId = body._id;
  });

  it('PATCH /api/cart/:id/add-item - add item', async () => {
    productId = new mongoose.Types.ObjectId().toString();
    const res = await request(app.getHttpServer() as import('http').Server)
      .patch(`/cart/${cartId}/add-item`)
      .send({ productId, quantity: 2, price: 10 });
    expect(res.status).toBe(200);
    type CartItemResponse = { productId: string; quantity: number; price: number };
    type CartResponse = { items: CartItemResponse[]; total: number };
    const body = res.body as CartResponse;
    expect(body.items.length).toBe(1);
    expect(body.total).toBe(20);
  });

  it('PATCH /api/cart/:id/update-item - update item', async () => {
    const res = await request(app.getHttpServer() as import('http').Server)
      .patch(`/cart/${cartId}/update-item`)
      .send({ productId, quantity: 3, price: 15 });
    expect(res.status).toBe(200);
    type CartItemResponse = { productId: string; quantity: number; price: number };
    type CartResponse = { items: CartItemResponse[]; total: number };
    const body = res.body as CartResponse;
    expect(body.items[0].quantity).toBe(3);
    expect(body.items[0].price).toBe(15);
    expect(body.total).toBe(45);
  });

  it('PATCH /api/cart/:id/remove-item - remove item', async () => {
    const res = await request(app.getHttpServer() as import('http').Server)
      .patch(`/cart/${cartId}/remove-item`)
      .send({ productId });
    expect(res.status).toBe(200);
    const body = res.body as { items: any[]; total: number };
    expect(body.items.length).toBe(0);
    expect(body.total).toBe(0);
  });

  it('PATCH /api/cart/:id/clear - clear cart', async () => {
    // Add item first
    await request(app.getHttpServer() as import('http').Server)
      .patch(`/cart/${cartId}/add-item`)
      .send({ productId, quantity: 1, price: 5 });
    const res = await request(app.getHttpServer() as import('http').Server)
      .patch(`/cart/${cartId}/clear`)
      .send();
    expect(res.status).toBe(204);
  });

  it('PATCH /api/cart/:id/recalculate - recalculate total', async () => {
    // Add two items
    await request(app.getHttpServer() as import('http').Server)
      .patch(`/cart/${cartId}/add-item`)
      .send({ productId, quantity: 2, price: 10 });
    await request(app.getHttpServer() as import('http').Server)
      .patch(`/cart/${cartId}/add-item`)
      .send({ productId: new mongoose.Types.ObjectId().toString(), quantity: 1, price: 5 });
    const res = await request(app.getHttpServer() as import('http').Server)
      .patch(`/cart/${cartId}/recalculate`)
      .send();
    expect(res.status).toBe(200);
    const body = res.body as { total: number };
    expect(body.total).toBe(25);
  });

  it('GET /api/cart/:id - get cart', async () => {
    const res = await request(app.getHttpServer() as import('http').Server)
      .get(`/cart/${cartId}`)
      .send();
    expect(res.status).toBe(200);
    const body = res.body as { _id: string };
    expect(body).toHaveProperty('_id', cartId);
  });
});
