import { Test } from '@nestjs/testing';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category, CategorySchema } from './category.schema';
import { CategoryStatus, CategoryTreeNode } from '../types/category.types';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Document } from 'mongoose';

jest.setTimeout(30000);

describe('Category Schema', () => {
  let mongod: MongoMemoryServer;
  let categoryModel: Model<Category>;
  let module: import('@nestjs/testing').TestingModule;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
      ],
    }).compile();
    categoryModel = module.get(getModelToken(Category.name));
    await categoryModel.syncIndexes();
  });

  afterAll(async () => {
    if (mongod && typeof mongod.stop === 'function') await mongod.stop();
    const mongoose = await import('mongoose');
    await mongoose.disconnect();
  });

  it('should create category with required fields and defaults', async () => {
    const cat = await categoryModel.create({ name: 'Electronics' });
    expect(cat.name).toBe('Electronics');
    expect(cat.slug).toBe('electronics');
    expect(cat.productCount).toBe(0);
    expect(cat.status).toBe(CategoryStatus.ACTIVE);
    expect(cat.isDeleted).toBe(false);
    expect(cat.isActive).toBe(true);
    expect(cat.sortOrder).toBe(0);
    expect(cat.description).toBeUndefined();
    expect(cat.image).toBeUndefined();
  });

  it('should allow description, image, sortOrder, isActive', async () => {
    const cat = await categoryModel.create({
      name: 'Books',
      description: 'All books',
      image: 'books.jpg',
      sortOrder: 5,
      isActive: false,
    });
    expect(cat.description).toBe('All books');
    expect(cat.image).toBe('books.jpg');
    expect(cat.sortOrder).toBe(5);
    expect(cat.isActive).toBe(false);
  });

  it('should generate unique slug and enforce uniqueness', async () => {
    await categoryModel.create({ name: 'UniqueBooks' });
    await expect(categoryModel.create({ name: 'UniqueBooks' })).rejects.toMatchObject({
      code: 11000,
    });
  });

  it('should support hierarchical categories', async () => {
    const parent = await categoryModel.create({ name: 'Clothing' });
    const child = await categoryModel.create({ name: 'Men', parentCategory: parent._id });
    expect(child.parentCategory!.toString()).toBe((parent._id as Types.ObjectId).toString());
  });
  it('should soft delete a category', async () => {
    type CategoryWithSoftDelete = Category & Document & { softDelete: () => Promise<void> };
    const cat = (await categoryModel.create({ name: 'Toys' })) as unknown as CategoryWithSoftDelete;
    await cat.softDelete();
    const found = await categoryModel.findById(cat._id);
    expect(found!.isDeleted).toBe(true);
    expect(found!.status).toBe(CategoryStatus.DELETED);
  });
  it('should build category tree', async () => {
    const root = await categoryModel.create({ name: 'RootCat' });
    await categoryModel.create({ name: 'Sub1', parentCategory: root._id });
    await categoryModel.create({ name: 'Sub2', parentCategory: root._id });
    interface CategoryModelWithTree extends Model<Category> {
      buildCategoryTree(): Promise<CategoryTreeNode[]>;
    }
    const tree: CategoryTreeNode[] = await (
      categoryModel as CategoryModelWithTree
    ).buildCategoryTree();
    const rootNode = tree.find((n) => n.name === 'RootCat');
    expect(rootNode && rootNode.children && rootNode.children.length).toBeGreaterThanOrEqual(2);
    expect(rootNode && rootNode.children && rootNode.children.map((c) => c.name)).toEqual(
      expect.arrayContaining(['Sub1', 'Sub2']),
    );
  });
});
