import { IsString, IsNumber, IsOptional, IsArray, IsEnum, Min } from 'class-validator';
import { ProductStatus } from '../enums/product-status.enum';

export class CreateProductDto {
  @IsString() name!: string;
  @IsNumber() @Min(0) price!: number;
  @IsString() category!: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) attributes?: string[];
  @IsOptional() @IsEnum(ProductStatus) status?: ProductStatus = ProductStatus.ACTIVE;
}
