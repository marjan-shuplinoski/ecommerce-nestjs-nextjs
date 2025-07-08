import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Cart, CartSchema } from './schemas/cart.schema';
import { CartItem, CartItemSchema } from './schemas/cart-item.schema';
import { NotificationService } from '../../shared/notification';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cart.name, schema: CartSchema },
      { name: CartItem.name, schema: CartItemSchema },
    ]),
  ],
  controllers: [CartController],
  providers: [CartService, NotificationService],
  exports: [CartService],
})
export class CartModule {}
