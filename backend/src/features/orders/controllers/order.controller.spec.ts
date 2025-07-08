import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from '../services/order.service';
import { NotificationService } from '../../../shared/notification';
import { Types } from 'mongoose';
import { OrderStatus } from '../enums/order-status.enum';
import { PaymentStatus } from '../enums/payment-status.enum';

describe('OrderController', () => {
  let controller: OrderController;

  const userId = new Types.ObjectId().toString();
  const orderId = new Types.ObjectId().toString();
  const orderMock = { _id: orderId, userId, items: [], status: 'pending', paymentConfirmed: false };
  const notificationMock = { type: 'success', message: 'ok' };

  const serviceMock = {
    createOrder: jest.fn().mockResolvedValue({ order: orderMock, notification: notificationMock }),
    getOrders: jest.fn().mockResolvedValue([orderMock]),
    getOrder: jest.fn().mockResolvedValue(orderMock),
    updateStatus: jest.fn().mockResolvedValue({ order: orderMock, notification: notificationMock }),
    confirmPayment: jest
      .fn()
      .mockResolvedValue({ order: orderMock, notification: notificationMock }),
    cancelOrder: jest.fn().mockResolvedValue({ order: orderMock, notification: notificationMock }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [{ provide: OrderService, useValue: serviceMock }, NotificationService],
    }).compile();
    controller = module.get<OrderController>(OrderController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockUser = {
    id: userId,
    email: 'test@example.com',
    isAdmin: false,
    roles: [],
  };
  const mockAdmin = {
    id: userId,
    email: 'admin@example.com',
    isAdmin: true,
    roles: ['admin'],
  };

  it('should create an order', async () => {
    const address = {
      firstName: 'John',
      lastName: 'Doe',
      street: '123 Main St',
      city: 'Metropolis',
      state: 'NY',
      zipCode: '12345',
      country: 'USA',
      phoneNumber: '1234567890',
    };
    const dto = {
      items: [],
      shippingAddress: address,
      cartId: '64b7e2f2c2a4b2a1e8c1d2e3',
      billingAddress: address,
    };
    const req = { user: mockUser };
    const result = await controller.createOrder(req, dto);
    expect(serviceMock.createOrder).toHaveBeenCalled();
    expect(result).toHaveProperty('order');
  });

  it('should get user orders', async () => {
    const req = { user: mockUser };
    const result = await controller.getOrders(req);
    expect(serviceMock.getOrders).toHaveBeenCalled();
    expect(result).toBeInstanceOf(Array);
  });

  it('should get order by id', async () => {
    const req = { user: mockUser };
    const result = await controller.getOrder(req, orderId);
    expect(serviceMock.getOrder).toHaveBeenCalled();
    expect(result).toHaveProperty('_id');
  });

  it('should update order status', async () => {
    const req = { user: mockAdmin };
    const dto = { status: OrderStatus.SHIPPED };
    const result = await controller.updateStatus(req, orderId, dto);
    expect(serviceMock.updateStatus).toHaveBeenCalled();
    expect(result).toHaveProperty('order');
  });

  it('should confirm payment', async () => {
    const req = { user: mockAdmin };
    const dto = { paymentStatus: PaymentStatus.CONFIRMED };
    const result = await controller.confirmPayment(req, orderId, dto);
    expect(serviceMock.confirmPayment).toHaveBeenCalled();
    expect(result).toHaveProperty('order');
  });

  it('should cancel order', async () => {
    const req = { user: mockUser };
    const result = await controller.cancelOrder(req, orderId);
    expect(serviceMock.cancelOrder).toHaveBeenCalled();
    expect(result).toHaveProperty('order');
  });
});
