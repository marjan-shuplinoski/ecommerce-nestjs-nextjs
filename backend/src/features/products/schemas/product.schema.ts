import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ProductStatus } from '../enums/product-status.enum';
import { ProductAttribute, ProductSpecification, SeoMeta, Review } from '../types/product.types';
import { ReviewSchema } from './review.schema';

@Schema({ timestamps: true, collection: 'products' })
export class Product extends Document {
  @Prop({ required: true, trim: true, index: 'text' })
  name!: string;

  @Prop({ required: true, trim: true })
  slug!: string;

  @Prop({ required: true, trim: true, index: 'text' })
  description!: string;

  @Prop({ trim: true })
  shortDescription?: string;

  @Prop({ required: true })
  price!: number;

  @Prop()
  salePrice?: number;

  @Prop({ required: true, trim: true })
  sku!: string;

  @Prop({ trim: true })
  brand?: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category!: Types.ObjectId;

  @Prop({ type: [String], default: [] })
  images!: string[];

  @Prop({ required: true })
  stock!: number;

  @Prop({
    type: String,
    enum: Object.values(ProductStatus),
    default: ProductStatus.ACTIVE,
  })
  status!: ProductStatus;

  @Prop({
    type: [Object],
    default: [],
    _id: false,
  })
  attributes!: ProductAttribute[];

  @Prop({
    type: [Object],
    default: [],
    _id: false,
  })
  specifications!: ProductSpecification[];

  @Prop({ type: [String], default: [] })
  tags!: string[];

  @Prop()
  weight?: number;

  @Prop({
    type: Object,
    default: undefined,
  })
  dimensions?: { length: number; width: number; height: number };

  @Prop({
    type: Object,
    default: undefined,
  })
  seo?: SeoMeta;

  @Prop({
    type: [ReviewSchema],
    default: [],
    _id: false,
  })
  reviews!: Review[];

  // Virtuals for averageRating and totalReviews are defined below
}

export interface ProductDocument extends Product, Document {
  averageRating: number;
  totalReviews: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

// Slug auto-generation
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

ProductSchema.pre('validate', function (next) {
  if (this.name && (!this.slug || this.isModified('name'))) {
    this.slug = generateSlug(this.name);
  }
  next();
});

ProductSchema.index({ name: 'text', description: 'text', tags: 'text' });
ProductSchema.index({ slug: 1 }, { unique: true });
ProductSchema.index({ category: 1 });
ProductSchema.index({ sku: 1 }, { unique: true });

// Virtuals for average rating, review count
ProductSchema.virtual('averageRating').get(function (this: Product) {
  if (!this.reviews || this.reviews.length === 0) return 0;
  return (
    this.reviews.reduce(
      (
        sum: number,
        r: { user: Types.ObjectId; rating: number; comment: string; createdAt: Date },
      ) => sum + (typeof r.rating === 'number' ? r.rating : 0),
      0,
    ) / this.reviews.length
  );
});

ProductSchema.virtual('totalReviews').get(function (this: Product) {
  return this.reviews ? this.reviews.length : 0;
});

ProductSchema.set('toObject', { virtuals: true });
ProductSchema.set('toJSON', { virtuals: true });
