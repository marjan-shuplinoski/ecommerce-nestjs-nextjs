import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from '../services/order.service';
import { NotificationService } from '../../../shared/notification';
import { OrderController } from '../controllers/order.controller';
import { RequestUser } from '../../../shared/types/request-user.interface';
import { OrderStatus } from '../enums/order-status.enum';
import { PaymentStatus } from '../enums/payment-status.enum';
import { jest } from '@jest/globals';
import { OrderDocument } from '../schemas/order.schema';

describe('OrderController', () => {
  let controller: OrderController;
  let service: jest.Mocked<OrderService>;

  const mockUser: RequestUser = {
    id: '507f1f77bcf86cd799439011', // valid ObjectId
    isAdmin: false,
    email: 'user@example.com',
  };
  const mockAdmin: RequestUser = {
    id: '507f1f77bcf86cd799439012', // valid ObjectId
    isAdmin: true,
    email: 'admin@example.com',
  };

  const validAddress = {
    firstName: 'John',
    lastName: 'Doe',
    street: '123 Main St',
    city: 'Testville',
    state: 'TS',
    zipCode: '12345',
    country: 'Testland',
    phoneNumber: '1234567890',
  };

  const fullMockOrder = {
    _id: 'orderid',
    user: mockUser.id,
    orderNumber: 'ORD-123',
    items: [],
    shippingAddress: validAddress,
    billingAddress: validAddress,
    subtotal: 100,
    tax: 0,
    shipping: 0,
    discount: 0,
    total: 100,
    status: OrderStatus.PENDING,
    paymentStatus: PaymentStatus.UNPAID,
    paymentMethod: 'cash_on_delivery',
    notes: '',
    history: [],
    paymentConfirmationId: undefined,
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0,
    save: jest.fn(),
    equals: jest.fn(),
  } as unknown as OrderDocument;

  beforeEach(async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const serviceMock: jest.Mocked<OrderService> = {
      createOrder: jest.fn(),
      updateStatus: jest.fn(),
      confirmPayment: jest.fn(),
      getOrder: jest.fn(),
      getOrders: jest.fn(),
      cancelOrder: jest.fn(),
    } as any;
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [{ provide: OrderService, useValue: serviceMock }, NotificationService],
    }).compile();
    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService) as jest.Mocked<OrderService>;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an order', async () => {
    const dto = { cartId: 'cartid', shippingAddress: validAddress, billingAddress: validAddress };
    service.createOrder.mockResolvedValue({
      order: fullMockOrder,
      notification: { type: 'success', message: 'Order created' },
    });
    const req = { user: mockUser };
    const result = await controller.createOrder(req, dto);
    expect(result.order).toBe(fullMockOrder);
    expect(result.notification).toBeDefined();
  });

  it('should get orders for user', async () => {
    service.getOrders.mockResolvedValue([fullMockOrder]);
    const req = { user: mockUser };
    const result = await controller.getOrders(req);
    expect(result).toEqual([fullMockOrder]);
  });

  it('should get order details for user', async () => {
    service.getOrder.mockResolvedValue(fullMockOrder);
    const req = { user: mockUser };
    const result = await controller.getOrder(req, 'orderid');
    expect(result).toBe(fullMockOrder);
  });

  it('should update order status as admin', async () => {
    const dto = { status: OrderStatus.CONFIRMED };
    const mockOrder = {
      ...fullMockOrder,
      status: OrderStatus.CONFIRMED,
    } as unknown as OrderDocument;
    service.updateStatus.mockResolvedValue({
      order: mockOrder,
      notification: { type: 'success', message: 'Status updated' },
    });
    const req = { user: mockAdmin };
    const result = await controller.updateStatus(req, 'orderid', dto);
    expect(result.order).toBe(mockOrder);
    expect(result.notification).toBeDefined();
  });

  it('should not allow non-admin to update status except cancel', async () => {
    const dto = { status: OrderStatus.CONFIRMED };
    service.updateStatus.mockRejectedValue(new Error('Only admin can update status'));
    const req = { user: mockUser };
    await expect(controller.updateStatus(req, 'orderid', dto)).rejects.toThrow(
      'Only admin can update status',
    );
  });

  it('should confirm payment as admin', async () => {
    const dto = { paymentStatus: PaymentStatus.PAID };
    const mockOrder = {
      ...fullMockOrder,
      paymentStatus: PaymentStatus.PAID,
    } as unknown as OrderDocument;
    service.confirmPayment.mockResolvedValue({
      order: mockOrder,
      notification: { type: 'success', message: 'Payment confirmed' },
    });
    const req = { user: mockAdmin };
    const result = await controller.confirmPayment(req, 'orderid', dto);
    expect(result.order).toBe(mockOrder);
    expect(result.notification).toBeDefined();
  });

  it('should not allow non-admin to confirm payment', async () => {
    const dto = { paymentStatus: PaymentStatus.PAID };
    service.confirmPayment.mockRejectedValue(new Error('Only admin can confirm payment'));
    const req = { user: mockUser };
    await expect(controller.confirmPayment(req, 'orderid', dto)).rejects.toThrow(
      'Only admin can confirm payment',
    );
  });

  it('should cancel order as user', async () => {
    const mockOrder = {
      ...fullMockOrder,
      status: OrderStatus.CANCELLED,
    } as unknown as OrderDocument;
    service.cancelOrder.mockResolvedValue({
      order: mockOrder,
      notification: { type: 'warning', message: 'Order cancelled' },
    });
    const req = { user: mockUser };
    const result = await controller.cancelOrder(req, 'orderid', 'cancel');
    expect(result.order).toBe(mockOrder);
    expect(result.notification).toBeDefined();
  });

  it('should handle service errors', async () => {
    service.createOrder.mockRejectedValue(new Error('fail'));
    const req = { user: mockUser };
    await expect(
      controller.createOrder(req, {
        cartId: 'cartid',
        shippingAddress: validAddress,
        billingAddress: validAddress,
      }),
    ).rejects.toThrow('fail');
  });
});
