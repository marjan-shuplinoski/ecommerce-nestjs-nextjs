import { IsString, IsEnum, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AddressType } from '../schemas/user.schema';

export class AddAddressDto {
  @ApiProperty({
    description: 'Type of address',
    enum: AddressType,
    example: AddressType.SHIPPING,
  })
  @IsEnum(AddressType)
  type!: AddressType;

  @ApiProperty({
    description: 'Street address',
    example: '123 Main St',
  })
  @IsString()
  street!: string;

  @ApiProperty({
    description: 'City',
    example: 'New York',
  })
  @IsString()
  city!: string;

  @ApiProperty({
    description: 'State or province',
    example: 'NY',
  })
  @IsString()
  state!: string;

  @ApiProperty({
    description: 'ZIP or postal code',
    example: '10001',
  })
  @IsString()
  zipCode!: string;

  @ApiProperty({
    description: 'Country',
    example: 'USA',
  })
  @IsString()
  country!: string;

  @ApiPropertyOptional({
    description: 'Whether this is the default address',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}
