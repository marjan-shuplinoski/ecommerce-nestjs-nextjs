import { IsNotEmpty, IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from '../enums/order-status.enum';

export class UpdateOrderStatusDto {
  @IsNotEmpty() @IsEnum(OrderStatus) status!: OrderStatus;
  @IsOptional() @IsString() notes?: string;
}
