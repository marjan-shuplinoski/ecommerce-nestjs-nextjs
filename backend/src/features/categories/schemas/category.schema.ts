import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { CategoryStatus, CategoryTreeNode } from '../types/category.types';

interface MappedCategory extends CategoryTreeNode {
  _id: string;
  parentCategory?: string;
}

@Schema({
  timestamps: true,
  collection: 'categories',
})
export class Category extends Document {
  @Prop({ required: true, trim: true, unique: true })
  name!: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  })
  slug!: string;

  @Prop()
  description?: string;

  @Prop()
  image?: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Category',
    default: null,
    index: true,
  })
  parentCategory?: Types.ObjectId | null;

  @Prop({ type: Boolean, default: true })
  isActive!: boolean;

  @Prop({ type: Number, default: 0 })
  sortOrder!: number;

  @Prop({ type: Number, default: 0 })
  productCount!: number;

  @Prop({
    type: String,
    enum: CategoryStatus,
    default: CategoryStatus.ACTIVE,
    index: true,
  })
  status!: CategoryStatus;

  @Prop({ type: Boolean, default: false })
  isDeleted!: boolean;

  // createdAt, updatedAt are handled by timestamps: true
}

export const CategorySchema = SchemaFactory.createForClass(Category);

// Simple slug generator (alphanumeric, dashes, lowercase)
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

CategorySchema.pre('validate', function (next) {
  const name: string = typeof this.name === 'string' ? this.name : '';
  this.slug = name ? generateSlug(name) : '';
  next();
});

CategorySchema.index({ name: 1 }, { unique: true });
CategorySchema.index({ slug: 1 }, { unique: true });
CategorySchema.index({ parentCategory: 1 });

CategorySchema.statics.buildCategoryTree = async function (): Promise<CategoryTreeNode[]> {
  const self = this as import('mongoose').Model<Category>;
  const docs = (await self.find({ isDeleted: false }).lean().exec()) as Array<
    Record<string, unknown>
  >;
  const categories: MappedCategory[] = docs.map((doc) => {
    const _doc = doc as { _id: Types.ObjectId | string; parentCategory?: Types.ObjectId | string };
    return {
      ..._doc,
      _id: String(_doc._id),
      parentCategory: _doc.parentCategory ? String(_doc.parentCategory) : undefined,
    } as MappedCategory;
  });
  const map: Record<string, CategoryTreeNode> = {};
  for (const cat of categories) {
    map[cat._id] = { ...cat, children: [] };
  }
  const tree: CategoryTreeNode[] = [];
  for (const cat of categories) {
    const parentId = cat.parentCategory ? String(cat.parentCategory) : null;
    if (parentId && map[parentId]) {
      map[parentId].children!.push(map[cat._id]);
    } else {
      tree.push(map[cat._id]);
    }
  }
  return tree;
};

CategorySchema.methods.softDelete = function (this: Category) {
  this.isDeleted = true;
  this.status = CategoryStatus.DELETED;
  return this.save();
};
