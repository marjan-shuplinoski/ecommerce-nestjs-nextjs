import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { CartService } from './cart.service';
import { Cart } from './schemas/cart.schema';

type MockCart = {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    items: any[];
    total: number;
    isGuest: boolean;
    save: jest.Mock<any, any>;
};

describe('CartService', () => {
    let service: CartService;
    let cartModel: typeof MockCartModel;

    class MockCartModel {
        userId: Types.ObjectId = new Types.ObjectId();
        isGuest: boolean = false;
        items: any[] = [];
        total = 0;
        save = jest.fn().mockResolvedValue(this);
        constructor(data: any) {
            Object.assign(this, data);
        }
        static findById = jest.fn();
        static create = jest.fn();
    }

    const mockCart: MockCart = {
        _id: new Types.ObjectId(),
        userId: new Types.ObjectId(),
        items: [],
        total: 0,
        isGuest: false,
        save: jest.fn().mockResolvedValue(undefined),
    };

    beforeEach(async () => {
        cartModel = MockCartModel;
        cartModel.findById = jest.fn().mockResolvedValue({ ...mockCart, save: jest.fn() });
        cartModel.create = jest.fn().mockResolvedValue(mockCart);
        const module: TestingModule = await Test.createTestingModule({
            providers: [CartService, { provide: getModelToken(Cart.name), useValue: cartModel }],
        }).compile();
        service = module.get<CartService>(CartService);
    });

    it('should create a cart', async () => {
        cartModel.create = jest.fn().mockResolvedValue(mockCart);
        const cart = await service.createCart(mockCart.userId, false);
        expect(cart).toHaveProperty('userId');
        expect(cart).toHaveProperty('isGuest', false);
    });

    it('should get a cart by id', async () => {
        cartModel.findById = jest.fn().mockResolvedValue(mockCart);
        const cart = await service.getCartById(mockCart._id.toString());
        expect(cart).toHaveProperty('_id');
    });

    it('should add an item to the cart', async () => {
        const item = { productId: new Types.ObjectId(), quantity: 2, price: 10 };
        const cartWithItem = {
            ...mockCart,
            items: [item],
            save: jest.fn(),
        };
        cartModel.findById = jest.fn().mockResolvedValue({
            ...mockCart,
            items: [],
            save: jest.fn().mockResolvedValue(cartWithItem),
        });
        const cart = await service.addItem(mockCart._id.toString(), item);
        expect(cart.items.length).toBeGreaterThan(0);
        expect(cart.total).toBe(item.price * item.quantity);
    });

    it('should remove an item from the cart', async () => {
        const productId = new Types.ObjectId();
        const item = { productId, quantity: 1, price: 5 };
        const cartWithItem = {
            ...mockCart,
            items: [item],
            save: jest.fn(),
        };
        cartModel.findById = jest.fn().mockResolvedValue({
            ...cartWithItem,
            save: jest.fn().mockResolvedValue({ ...mockCart, items: [], total: 0 }),
        });
        const cart = await service.removeItem(mockCart._id.toString(), productId);
        expect(cart.items.length).toBe(0);
        expect(cart.total).toBe(0);
    });

    it('should update an item in the cart', async () => {
        const productId = new Types.ObjectId();
        const item = { productId, quantity: 1, price: 5 };
        const updatedItem = { productId, quantity: 3, price: 7 };
        const cartWithItem = {
            ...mockCart,
            items: [item],
            save: jest.fn(),
        };
        cartModel.findById = jest.fn().mockResolvedValue({
            ...cartWithItem,
            items: [item],
            save: jest.fn().mockResolvedValue({ ...mockCart, items: [updatedItem], total: 21 }),
        });
        const cart = await service.updateItem(mockCart._id.toString(), updatedItem);
        expect(cart.items[0].quantity).toBe(3);
        expect(cart.items[0].price).toBe(7);
        expect(cart.total).toBe(21);
    });

    it('should clear the cart', async () => {
        const cartWithItems = {
            ...mockCart,
            items: [{ productId: new Types.ObjectId(), quantity: 2, price: 10 }],
            total: 20,
            save: jest.fn(),
        };
        cartModel.findById = jest.fn().mockResolvedValue({
            ...cartWithItems,
            save: jest.fn().mockResolvedValue({ ...mockCart, items: [], total: 0 }),
        });
        const cart = await service.clearCart(mockCart._id.toString());
        expect(cart.items.length).toBe(0);
        expect(cart.total).toBe(0);
    });

    it('should recalculate total', async () => {
        const items = [
            { productId: new Types.ObjectId(), quantity: 2, price: 10 },
            { productId: new Types.ObjectId(), quantity: 1, price: 5 },
        ];
        const cartWithItems = {
            ...mockCart,
            items,
            total: 0,
            save: jest.fn(),
        };
        cartModel.findById = jest.fn().mockResolvedValue({
            ...cartWithItems,
            save: jest.fn().mockResolvedValue({ ...cartWithItems, total: 25 }),
        });
        const cart = await service.recalculateTotal(mockCart._id.toString());
        expect(cart.total).toBe(25);
    });
});
