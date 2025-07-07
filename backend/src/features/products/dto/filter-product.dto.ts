import { IsOptional, IsString, IsNumber, IsArray, IsEnum, Min } from 'class-validator';
import { ProductStatus } from '../enums/product-status.enum';

export class FilterProductDto {
  @IsOptional() @IsString() category?: string;
  @IsOptional() @IsEnum(ProductStatus) status?: ProductStatus;
  @IsOptional() @IsNumber() @Min(0) minPrice?: number;
  @IsOptional() @IsNumber() @Min(0) maxPrice?: number;
  @IsOptional() @IsArray() @IsString({ each: true }) attributes?: string[];
  @IsOptional() @IsString() search?: string;
  @IsOptional() @IsNumber() @Min(1) page?: number;
  @IsOptional() @IsNumber() @Min(1) limit?: number;
  @IsOptional() @IsString() sortBy?: string;
  @IsOptional() @IsString() order?: 'asc' | 'desc';
}
