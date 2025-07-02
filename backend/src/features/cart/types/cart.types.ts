// Cart type definitions
import { Types } from 'mongoose';

export interface CartItem {
  productId: Types.ObjectId;
  quantity: number;
  price: number;
}

export interface Cart {
  userId?: Types.ObjectId;
  items: CartItem[];
  total: number;
  expiresAt?: Date;
  isGuest: boolean;
}
