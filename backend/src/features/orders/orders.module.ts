import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { Order, OrderSchema } from './schemas/order.schema';
import { NotificationService } from '../../shared/notification';

@Module({
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }])],
  controllers: [OrderController],
  providers: [OrderService, NotificationService],
  exports: [OrderService],
})
export class OrdersModule {}
