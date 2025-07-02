import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ _id: false })
export class OrderItem extends Document {
  @Prop({ type: Types.ObjectId, required: true, ref: 'Product' })
  product!: Types.ObjectId;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  price!: number;

  @Prop({ required: true })
  quantity!: number;

  @Prop({ required: true })
  total!: number;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
