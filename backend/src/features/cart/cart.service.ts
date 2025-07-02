import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';

interface AddItemInput {
  productId: Types.ObjectId;
  quantity: number;
  price: number;
}

interface UpdateItemInput {
  productId: Types.ObjectId;
  quantity: number;
  price: number;
}

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}

  async createCart(userId?: Types.ObjectId, isGuest = false): Promise<CartDocument> {
    const cart = new this.cartModel({ userId, isGuest });
    await cart.save();
    return cart;
  }

  async getCartById(cartId: string): Promise<CartDocument> {
    const cart = await this.cartModel.findById(cartId);
    if (!cart) throw new NotFoundException('Cart not found');
    return cart;
  }

  async addItem(cartId: string, item: AddItemInput): Promise<CartDocument> {
    const cart = await this.getCartById(cartId);
    const existing = cart.items.find((i) => i.productId.equals(item.productId));
    if (existing) {
      existing.quantity += item.quantity;
      existing.price = item.price;
    } else {
      cart.items.push({ ...item });
    }
    cart.total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    await cart.save();
    return cart;
  }

  async removeItem(cartId: string, productId: Types.ObjectId): Promise<CartDocument> {
    const cart = await this.getCartById(cartId);
    cart.items = cart.items.filter((i) => !i.productId.equals(productId));
    cart.total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    await cart.save();
    return cart;
  }

  async updateItem(cartId: string, item: UpdateItemInput): Promise<CartDocument> {
    const cart = await this.getCartById(cartId);
    const existing = cart.items.find((i) => i.productId.equals(item.productId));
    if (!existing) throw new NotFoundException('Item not found in cart');
    existing.quantity = item.quantity;
    existing.price = item.price;
    cart.total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    await cart.save();
    return cart;
  }

  async clearCart(cartId: string): Promise<CartDocument> {
    const cart = await this.getCartById(cartId);
    cart.items = [];
    cart.total = 0;
    await cart.save();
    return cart;
  }

  async recalculateTotal(cartId: string): Promise<CartDocument> {
    const cart = await this.getCartById(cartId);
    cart.total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    await cart.save();
    return cart;
  }
}
