import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@Schema({ _id: false, timestamps: true })
export class Review extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user!: Types.ObjectId;

  @Prop({ required: true, min: 1, max: 5 })
  rating!: number;

  @Prop({ required: true, trim: true })
  comment!: string;

  @Prop({ type: Date, default: Date.now })
  createdAt!: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
