import { Types } from 'mongoose';

export interface ProductAttribute {
  name: string;
  value: string | number | boolean;
}

export interface ProductSpecification {
  key: string;
  value: string | number | boolean;
}

export interface SeoMeta {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
}

export interface ProductImage {
  url: string;
  alt?: string;
}

export interface Review {
  user: Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
}
