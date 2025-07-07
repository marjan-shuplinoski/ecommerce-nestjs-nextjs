import { IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SetDefaultAddressDto {
  @ApiProperty({ description: 'Index of the address to set as default', minimum: 0 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  addressIndex!: number;
}
