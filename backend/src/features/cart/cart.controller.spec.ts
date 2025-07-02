import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Types } from 'mongoose';

describe('CartController', () => {
  let controller: CartController;

  const cartId = new Types.ObjectId().toString();
  const userId = new Types.ObjectId().toString();
  const productId = new Types.ObjectId().toString();
  const cartMock = { _id: cartId, userId, items: [], total: 0, isGuest: false };

  const serviceMock = {
    createCart: jest.fn().mockResolvedValue(cartMock),
    getCartById: jest.fn().mockResolvedValue(cartMock),
    addItem: jest.fn().mockResolvedValue(cartMock),
    updateItem: jest.fn().mockResolvedValue(cartMock),
    removeItem: jest.fn().mockResolvedValue(cartMock),
    clearCart: jest.fn().mockResolvedValue(undefined),
    recalculateTotal: jest.fn().mockResolvedValue(cartMock),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [{ provide: CartService, useValue: serviceMock }],
    }).compile();
    controller = module.get<CartController>(CartController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a cart', async () => {
    const result = await controller.createCart(userId, false);
    expect(serviceMock.createCart).toHaveBeenCalledWith(expect.any(Types.ObjectId), false);
    expect(result).toEqual(cartMock);
  });

  it('should get a cart by id', async () => {
    const result = await controller.getCart(cartId);
    expect(serviceMock.getCartById).toHaveBeenCalledWith(cartId);
    expect(result).toEqual(cartMock);
  });

  it('should add an item', async () => {
    const item = {
      productId: new Types.ObjectId(productId),
      quantity: 2,
      price: 10,
    };
    const result = await controller.addItem(cartId, productId, 2, 10);
    expect(serviceMock.addItem).toHaveBeenCalledWith(cartId, expect.objectContaining(item));
    expect(result).toEqual(cartMock);
  });

  it('should update an item', async () => {
    const item = {
      productId: new Types.ObjectId(productId),
      quantity: 3,
      price: 15,
    };
    const result = await controller.updateItem(cartId, productId, 3, 15);
    expect(serviceMock.updateItem).toHaveBeenCalledWith(cartId, expect.objectContaining(item));
    expect(result).toEqual(cartMock);
  });

  it('should remove an item', async () => {
    const result = await controller.removeItem(cartId, productId);
    expect(serviceMock.removeItem).toHaveBeenCalledWith(cartId, expect.any(Types.ObjectId));
    expect(result).toEqual(cartMock);
  });

  it('should clear the cart', async () => {
    const result = await controller.clearCart(cartId);
    expect(serviceMock.clearCart).toHaveBeenCalledWith(cartId);
    expect(result).toBeUndefined();
  });

  it('should recalculate total', async () => {
    const result = await controller.recalculateTotal(cartId);
    expect(serviceMock.recalculateTotal).toHaveBeenCalledWith(cartId);
    expect(result).toEqual(cartMock);
  });
});
