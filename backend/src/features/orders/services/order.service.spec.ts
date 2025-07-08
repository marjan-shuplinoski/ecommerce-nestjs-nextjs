import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { OrderService } from './order.service';
import { Order } from '../schemas/order.schema';
import { NotificationService } from '../../../shared/notification';
import { Types } from 'mongoose';
import { OrderStatus } from '../enums/order-status.enum';
import { PaymentStatus } from '../enums/payment-status.enum';
import { Cart } from '../../cart/schemas/cart.schema';
import { Product } from '../../products/schemas/product.schema';

describe('OrderService', () => {
  let service: OrderService;
  let orderModel: {
    find: jest.Mock;
    findById: jest.Mock;
    findByIdAndUpdate: jest.Mock;
    create: jest.Mock;
  };

  const userId = new Types.ObjectId();
  const orderId = new Types.ObjectId();
  const orderMock = {
    _id: orderId,
    user: {
      equals: (id: Types.ObjectId) => id.toString() === userId.toString(),
    },
    items: [],
    status: 'pending',
    paymentConfirmed: false,
    history: { push: jest.fn() },
    save: jest.fn(),
  };

  beforeEach(async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    orderModel = {
      find: jest.fn().mockResolvedValue([orderMock]),
      findById: jest.fn().mockResolvedValue(orderMock),
      findByIdAndUpdate: jest.fn().mockResolvedValue(orderMock),
      create: jest.fn().mockResolvedValue(orderMock),
      db: {
        startSession: jest.fn().mockResolvedValue({
          startTransaction: jest.fn(),
          commitTransaction: jest.fn(),
          abortTransaction: jest.fn(),
          endSession: jest.fn(),
        }),
      },
    } as any;
    // Cart mock with chainable .session()
    interface CartMock {
      items: { productId: Types.ObjectId; quantity: number; price: number }[];
      userId: Types.ObjectId;
      total?: number;
      save?: (opts?: unknown) => Promise<void>;
      session?: (session?: unknown) => CartMock;
    }
    const cartObject: CartMock = {
      items: [{ productId: new Types.ObjectId(), quantity: 1, price: 10 }],
      userId: userId,
      total: 10,
      save: jest.fn().mockResolvedValue(undefined),
    };
    // Patch cartModel.findById to return an object with a .session() method that returns the cartObject
    const cartModel = {
      find: jest.fn(),
      findById: jest.fn().mockImplementation(() => {
        const result: CartMock = { ...cartObject };
        result.session = function () {
          return result;
        };
        return result;
      }),
      findByIdAndUpdate: jest.fn(),
      create: jest.fn(),
    };
    const productMock = {
      _id: new Types.ObjectId(),
      name: 'Test Product',
      stock: 100,
    };
    const productModel = {
      find: jest.fn(),
      findById: jest.fn().mockImplementation(() => {
        const result: any = { ...productMock };
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        result.session = function () {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return result;
        };
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return result;
      }),
      findByIdAndUpdate: jest.fn(),
      create: jest.fn(),
      updateOne: jest.fn().mockResolvedValue(undefined),
    };
    const notificationServiceMock = {
      notifySuccess: jest.fn().mockReturnValue({ type: 'success', message: 'ok' }),
      notifyWarning: jest.fn().mockReturnValue({ type: 'warning', message: 'warn' }),
      notifyError: jest.fn().mockReturnValue({ type: 'error', message: 'err' }),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: getModelToken(Order.name), useValue: orderModel },
        { provide: getModelToken(Cart.name), useValue: cartModel },
        { provide: getModelToken(Product.name), useValue: productModel },
        { provide: NotificationService, useValue: notificationServiceMock },
      ],
    }).compile();
    service = module.get<OrderService>(OrderService);

    // Always ensure orderMock.history is an array with .push
    orderMock.history = { push: jest.fn() };
    // Patch orderModel.findById to always return orderMock with user.equals
    orderModel.findById = jest.fn().mockResolvedValue(orderMock);
  });

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
    const result = await service.createOrder(userId, dto);
    expect(result).toHaveProperty('order');
  });

  it('should get orders', async () => {
    const result = await service.getOrders(userId, false);
    expect(result).toBeInstanceOf(Array);
  });

  it('should get order by id', async () => {
    const result = await service.getOrder(orderId.toString(), userId, false);
    expect(result).toHaveProperty('_id');
  });

  it('should update order status', async () => {
    const dto = { status: OrderStatus.SHIPPED };
    const result = await service.updateStatus(orderId.toString(), dto, userId, true);
    expect(result).toHaveProperty('order');
  });

  it('should confirm payment', async () => {
    const dto = { paymentStatus: PaymentStatus.CONFIRMED };
    const result = await service.confirmPayment(orderId.toString(), dto, userId, true);
    expect(result).toHaveProperty('order');
  });

  it('should cancel order', async () => {
    orderMock.status = 'pending';
    const result = await service.cancelOrder(orderId.toString(), userId, false);
    expect(result).toHaveProperty('order');
  });
});
