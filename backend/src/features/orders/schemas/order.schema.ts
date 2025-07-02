import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { OrderStatus } from '../enums/order-status.enum';
import { PaymentStatus } from '../enums/payment-status.enum';
import { OrderItem, OrderItemSchema } from './order-item.schema';

@Schema({ _id: false })
class ShippingAddress {
  @Prop({ required: true })
  firstName!: string;
  @Prop({ required: true })
  lastName!: string;
  @Prop({ required: true })
  street!: string;
  @Prop({ required: true })
  city!: string;
  @Prop({ required: true })
  state!: string;
  @Prop({ required: true })
  zipCode!: string;
  @Prop({ required: true })
  country!: string;
  @Prop({ required: true })
  phoneNumber!: string;
}

@Schema({ _id: false })
class BillingAddress {
  @Prop({ required: true })
  firstName!: string;
  @Prop({ required: true })
  lastName!: string;
  @Prop({ required: true })
  street!: string;
  @Prop({ required: true })
  city!: string;
  @Prop({ required: true })
  state!: string;
  @Prop({ required: true })
  zipCode!: string;
  @Prop({ required: true })
  country!: string;
}

@Schema({ _id: false })
class OrderHistory {
  @Prop({ required: true })
  event!: string;
  @Prop({ required: true })
  status!: string;
  @Prop({ required: true })
  paymentStatus!: string;
  @Prop({ required: true, default: Date.now })
  timestamp!: Date;
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user!: Types.ObjectId;
}

export type OrderDocument = Order & Document;

@Schema({ timestamps: true, collection: 'orders' })
export class Order extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user!: Types.ObjectId;

  @Prop({ required: true, unique: true })
  orderNumber!: string;

  @Prop({ type: [OrderItemSchema], required: true })
  items!: OrderItem[];

  @Prop({ type: ShippingAddress, required: true })
  shippingAddress!: ShippingAddress;

  @Prop({ type: BillingAddress, required: true })
  billingAddress!: BillingAddress;

  @Prop({ type: Number, required: true })
  subtotal!: number;

  @Prop({ type: Number, required: true })
  tax!: number;

  @Prop({ type: Number, required: true })
  shipping!: number;

  @Prop({ type: Number, required: true })
  discount!: number;

  @Prop({ type: Number, required: true })
  total!: number;

  @Prop({ type: String, enum: OrderStatus, required: true })
  status!: OrderStatus;

  @Prop({ type: String, enum: PaymentStatus, required: true })
  paymentStatus!: PaymentStatus;

  @Prop({ required: true, default: 'cash_on_delivery' })
  paymentMethod!: string;

  @Prop()
  paymentConfirmationId?: string;

  @Prop()
  trackingNumber?: string;

  @Prop()
  notes?: string;

  @Prop({ type: [OrderHistory], default: [] })
  history!: OrderHistory[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);

OrderSchema.pre('validate', function (next) {
  if (!this.orderNumber) {
    this.orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  }
  next();
});
