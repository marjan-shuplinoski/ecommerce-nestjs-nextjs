import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  Req,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderStatusDto } from '../dto/update-order-status.dto';
import { ConfirmPaymentDto } from '../dto/confirm-payment.dto';
import { RequestUser } from '../../../shared/types/request-user.interface';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createOrder(@Req() req: { user: RequestUser }, @Body() dto: CreateOrderDto) {
    return this.orderService.createOrder(new Types.ObjectId(req.user.id), dto);
  }

  @Get()
  async getOrders(@Req() req: { user: RequestUser }) {
    return this.orderService.getOrders(new Types.ObjectId(req.user.id), req.user.isAdmin);
  }

  @Get(':id')
  async getOrder(@Req() req: { user: RequestUser }, @Param('id') id: string) {
    return this.orderService.getOrder(id, new Types.ObjectId(req.user.id), req.user.isAdmin);
  }

  @Patch(':id/status')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async updateStatus(
    @Req() req: { user: RequestUser },
    @Param('id') id: string,
    @Body() dto: UpdateOrderStatusDto,
  ) {
    return this.orderService.updateStatus(
      id,
      dto,
      new Types.ObjectId(req.user.id),
      req.user.isAdmin,
    );
  }

  @Patch(':id/payment-status')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async confirmPayment(
    @Req() req: { user: RequestUser },
    @Param('id') id: string,
    @Body() dto: ConfirmPaymentDto,
  ) {
    return this.orderService.confirmPayment(
      id,
      dto,
      new Types.ObjectId(req.user.id),
      req.user.isAdmin,
    );
  }

  @Patch(':id/cancel')
  @HttpCode(HttpStatus.OK)
  async cancelOrder(
    @Req() req: { user: RequestUser },
    @Param('id') id: string,
    @Body('notes') notes?: string,
  ) {
    return this.orderService.cancelOrder(
      id,
      new Types.ObjectId(req.user.id),
      req.user.isAdmin,
      notes,
    );
  }
}
