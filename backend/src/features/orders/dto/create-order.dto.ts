import { IsNotEmpty, ValidateNested, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

class AddressDto {
  @IsNotEmpty() @IsString() firstName!: string;
  @IsNotEmpty() @IsString() lastName!: string;
  @IsNotEmpty() @IsString() street!: string;
  @IsNotEmpty() @IsString() city!: string;
  @IsNotEmpty() @IsString() state!: string;
  @IsNotEmpty() @IsString() zipCode!: string;
  @IsNotEmpty() @IsString() country!: string;
  @IsOptional() @IsString() phoneNumber?: string;
}

export class CreateOrderDto {
  @IsNotEmpty() @IsString() cartId!: string;
  @ValidateNested() @Type(() => AddressDto) shippingAddress!: AddressDto;
  @ValidateNested() @Type(() => AddressDto) billingAddress!: AddressDto;
  @IsOptional() @IsString() notes?: string;
}
