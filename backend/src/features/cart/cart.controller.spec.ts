import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Types } from 'mongoose';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { NotificationService } from '../../shared/notification';

describe('CartController', () => {
  let controller: CartController;

  const cartId = new Types.ObjectId().toString();
  const userId = new Types.ObjectId().toString();
  const productId = new Types.ObjectId().toString();
  const cartMock = { _id: cartId, userId, items: [], total: 0, isGuest: false };
  const notificationMock = { type: 'success', message: 'ok' };

  const serviceMock = {
    createCart: jest.fn().mockResolvedValue(cartMock),
    getCartById: jest.fn().mockResolvedValue(cartMock),
    addItem: jest.fn().mockResolvedValue({ cart: cartMock, notification: notificationMock }),
    updateItem: jest.fn().mockResolvedValue({ cart: cartMock, notification: notificationMock }),
    removeItem: jest.fn().mockResolvedValue({ cart: cartMock, notification: notificationMock }),
    clearCart: jest.fn().mockResolvedValue({ cart: cartMock, notification: notificationMock }),
    recalculateTotal: jest.fn().mockResolvedValue(cartMock),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [{ provide: CartService, useValue: serviceMock }, NotificationService],
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
    const dto: AddToCartDto = { productId: productId.toString(), quantity: 2, price: 10 };
    const result = await controller.addItem(cartId, dto);
    expect(serviceMock.addItem).toHaveBeenCalledWith(
      cartId,
      expect.objectContaining({
        quantity: 2,
        price: 10,
      }) as Partial<AddToCartDto>,
    );
    expect(result).toEqual({ cart: cartMock, notification: notificationMock });
  });

  it('should update an item', async () => {
    const dto: UpdateCartDto = { productId: productId.toString(), quantity: 3, price: 15 };
    const result = await controller.updateItem(cartId, dto);
    expect(serviceMock.updateItem).toHaveBeenCalledWith(
      cartId,
      expect.objectContaining({
        quantity: 3,
        price: 15,
      }) as Partial<UpdateCartDto>,
    );
    expect(result).toEqual({ cart: cartMock, notification: notificationMock });
  });

  it('should remove an item', async () => {
    const result = await controller.removeItem(cartId, productId);
    expect(serviceMock.removeItem).toHaveBeenCalledWith(cartId, expect.any(Types.ObjectId));
    expect(result).toEqual({ cart: cartMock, notification: notificationMock });
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
