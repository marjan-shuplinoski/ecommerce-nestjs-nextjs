import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { OrderService } from '../services/order.service';
import { NotificationService } from '../../../shared/notification';
import { Order, OrderDocument } from '../schemas/order.schema';
import { Cart } from '../../cart/schemas/cart.schema';
import { Product } from '../../products/schemas/product.schema';
import { OrderStatus } from '../enums/order-status.enum';
import { Types } from 'mongoose';
import { jest } from '@jest/globals';

describe('OrderService', () => {
  let service: OrderService;
  let orderModel: MockOrderModel;
  let cartModel: MockCartModel;
  let productModel: MockProductModel;

  class MockOrderModel {
    create: jest.Mock = jest.fn();
    findById: jest.Mock = jest.fn();
    find: jest.Mock = jest.fn();
    db = {
      startSession: jest.fn().mockReturnValue({
        startTransaction: jest.fn(),
        commitTransaction: jest.fn(),
        abortTransaction: jest.fn(),
        endSession: jest.fn(),
      }),
    };
  }
  class MockCartModel {
    findById: jest.Mock = jest.fn();
  }
  class MockProductModel {
    findById: jest.Mock = jest.fn();
    updateOne: jest.Mock = jest.fn();
  }

  beforeEach(async () => {
    orderModel = new MockOrderModel();
    cartModel = new MockCartModel();
    productModel = new MockProductModel();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: getModelToken(Order.name), useValue: orderModel },
        { provide: getModelToken(Cart.name), useValue: cartModel },
        { provide: getModelToken(Product.name), useValue: productModel },
        NotificationService,
      ],
    }).compile();
    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

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
    user: 'userid',
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
    paymentStatus: 'unpaid',
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

  it('should call createOrder and return notification', async () => {
    // @ts-expect-error (Jest/TS limitation: hand-rolled mock returns 'any', test-only, safe)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    orderModel.create.mockResolvedValue([fullMockOrder] as unknown as any);

    cartModel.findById.mockReturnValue({
      session: () => ({
        userId: undefined,
        items: [{ productId: 'prod1', price: 10, quantity: 2 }],
        save: jest.fn(),
      }),
    });

    productModel.findById.mockReturnValue({ session: () => ({ stock: 10, name: 'Test Product' }) });

    // @ts-expect-error (Jest/TS limitation: hand-rolled mock returns 'any', test-only, safe)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    productModel.updateOne.mockResolvedValue({} as unknown as any);
    const userId = 'userid' as unknown as Types.ObjectId;
    const dto = { cartId: 'cartid', shippingAddress: validAddress, billingAddress: validAddress };
    const result = await service.createOrder(userId, dto as any);
    expect(result.notification).toBeDefined();
  });

  it('should throw if cart not found', async () => {
    cartModel.findById.mockReturnValue({ session: () => null });
    const userId = 'userid' as unknown as Types.ObjectId;
    const dto = { cartId: 'cartid', shippingAddress: validAddress, billingAddress: validAddress };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await expect(service.createOrder(userId, dto as any)).rejects.toThrow();
  });

  it('should call updateStatus and return notification', async () => {
    // @ts-expect-error (Jest/TS limitation: hand-rolled mock returns 'any', test-only, safe)
    orderModel.findById.mockResolvedValue(fullMockOrder as unknown as any);
    const orderId = 'orderid';
    const dto = { status: OrderStatus.CONFIRMED };
    const userId = 'userid' as unknown as Types.ObjectId;
    const result = await service.updateStatus(orderId, dto, userId, true);
    expect(result.notification).toBeDefined();
  });

  it('should call confirmPayment and return notification', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const dto = { paymentStatus: 'paid' as any };
    // @ts-expect-error (Jest/TS limitation: hand-rolled mock returns 'any', test-only, safe)
    orderModel.findById.mockResolvedValue(fullMockOrder as unknown as any);
    const orderId = 'orderid';
    const userId = 'userid' as unknown as Types.ObjectId;
    const result = await service.confirmPayment(orderId, dto, userId, true);
    expect(result.notification).toBeDefined();
  });

  it('should call cancelOrder and return notification', async () => {
    // @ts-expect-error (Jest/TS limitation: hand-rolled mock returns 'any', test-only, safe)
    orderModel.findById.mockResolvedValue(fullMockOrder as unknown as any);
    const orderId = 'orderid';
    const userId = 'userid' as unknown as Types.ObjectId;
    const result = await service.cancelOrder(orderId, userId, true, 'notes');
    expect(result.notification).toBeDefined();
  });

  it('should call getOrder and return order', async () => {
    // @ts-expect-error (Jest/TS limitation: hand-rolled mock returns 'any', test-only, safe)
    orderModel.findById.mockResolvedValue(fullMockOrder as unknown as any);
    const orderId = 'orderid';
    const userId = 'userid' as unknown as Types.ObjectId;
    const result = await service.getOrder(orderId, userId, true);
    expect(result).toBeDefined();
  });
});
