import { IsNotEmpty, IsEnum, IsOptional, IsString } from 'class-validator';
import { PaymentStatus } from '../enums/payment-status.enum';

export class ConfirmPaymentDto {
  @IsNotEmpty() @IsEnum(PaymentStatus) paymentStatus!: PaymentStatus;
  @IsOptional() @IsString() paymentConfirmationId?: string;
  @IsOptional() @IsString() notes?: string;
}
