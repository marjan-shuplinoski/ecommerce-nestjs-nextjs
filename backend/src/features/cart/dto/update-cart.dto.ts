import { IsMongoId, IsInt, Min, IsNumber } from 'class-validator';

export class UpdateCartDto {
  @IsMongoId()
  productId!: string;

  @IsInt()
  @Min(1)
  quantity!: number;

  @IsNumber()
  price!: number;
}
