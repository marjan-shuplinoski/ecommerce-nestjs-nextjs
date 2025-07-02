// Shopping cart schema
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { CartItem, CartItemSchema } from './cart-item.schema';

@Schema({ timestamps: true })
export class Cart {
  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  userId?: Types.ObjectId;

  @Prop({ type: [CartItemSchema], default: [] })
  items!: CartItem[];

  @Prop({ type: Number, default: 0 })
  total!: number;

  @Prop({ type: Boolean, default: false })
  isGuest!: boolean;

  @Prop({ type: Date, required: false })
  expiresAt?: Date;
}

export type CartDocument = Cart & Document;
export const CartSchema = SchemaFactory.createForClass(Cart);

// Virtual for total calculation
type CartDoc = Cart & Document;
CartSchema.virtual('calculatedTotal').get(function (this: CartDoc) {
  return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
});
