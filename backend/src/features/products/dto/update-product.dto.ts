import { IsString, IsNumber, IsOptional, IsArray, IsEnum, Min } from 'class-validator';
import { ProductStatus } from '../enums/product-status.enum';

export class UpdateProductDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsNumber() @Min(0) price?: number;
  @IsOptional() @IsString() category?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) attributes?: string[];
  @IsOptional() @IsEnum(ProductStatus) status?: ProductStatus;
}
