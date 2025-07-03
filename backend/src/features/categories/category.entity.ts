import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class CategoryEntity {
  @ApiProperty({ example: '60f7c2b8e1d2c8a1b8e1d2c8', description: 'Category ID' })
  @Expose()
  readonly _id!: string | undefined;

  @ApiProperty({ example: 'Electronics', description: 'Category name' })
  @Expose()
  readonly name!: string;

  @ApiProperty({ example: 'electronics', description: 'Category slug' })
  @Expose()
  readonly slug!: string;

  @ApiProperty({
    example: 'All electronic items',
    description: 'Category description',
    required: false,
  })
  @Expose()
  readonly description?: string;

  @ApiProperty({
    example: 'https://cdn.site.com/img.jpg',
    description: 'Category image',
    required: false,
  })
  @Expose()
  readonly image?: string;

  @ApiProperty({
    example: '60f7c2b8e1d2c8a1b8e1d2c9',
    description: 'Parent category ID',
    required: false,
  })
  @Expose()
  readonly parentCategory?: string;

  @ApiProperty({ example: true, description: 'Is category active?' })
  @Expose()
  readonly isActive!: boolean;

  @ApiProperty({ example: 1, description: 'Sort order' })
  @Expose()
  readonly sortOrder!: number;

  @ApiProperty({ example: 0, description: 'Product count' })
  @Expose()
  readonly productCount!: number;

  @ApiProperty({ example: '2025-07-03T12:00:00.000Z', description: 'Created at' })
  @Expose()
  readonly createdAt!: Date;

  @ApiProperty({ example: '2025-07-03T12:00:00.000Z', description: 'Updated at' })
  @Expose()
  readonly updatedAt!: Date;

  constructor(partial: Partial<CategoryEntity>) {
    Object.assign(this, partial);
  }
}
