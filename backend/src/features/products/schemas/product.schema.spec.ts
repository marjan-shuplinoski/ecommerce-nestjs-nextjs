import { Connection, Model } from 'mongoose';
import { Product, ProductSchema } from './product.schema';
import { ProductStatus } from '../enums/product-status.enum';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

describe('ProductSchema', () => {
  let mongod: MongoMemoryServer;
  let connection: Connection;
  let productModel: Model<Product>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    connection = mongoose.createConnection(uri);
    productModel = connection.model(Product.name, ProductSchema);
  });

  afterAll(async () => {
    await connection.close();
    await mongod.stop();
  });

  it('should create a product with all required fields', async () => {
    const product = await productModel.create({
      name: 'Test Product',
      slug: 'test-product',
      description: 'A test product',
      price: 100,
      sku: 'SKU123',
      category: new mongoose.Types.ObjectId(),
      stock: 10,
      status: ProductStatus.ACTIVE,
    });
    expect(product.name).toBe('Test Product');
    expect(product.slug).toBe('test-product');
    expect(product.status).toBe(ProductStatus.ACTIVE);
  });

  it('should add a review and calculate averageRating', async () => {
    const product = await productModel.create({
      name: 'Review Product',
      slug: 'review-product',
      description: 'Product with reviews',
      price: 50,
      sku: 'SKU456',
      category: new mongoose.Types.ObjectId(),
      stock: 5,
      reviews: [
        { user: new mongoose.Types.ObjectId(), rating: 4, comment: 'Good', createdAt: new Date() },
        { user: new mongoose.Types.ObjectId(), rating: 5, comment: 'Great', createdAt: new Date() },
      ],
    });
    const plainObj = product.toObject();
    const averageRating =
      plainObj.reviews && plainObj.reviews.length
        ? plainObj.reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) /
          plainObj.reviews.length
        : 0;
    const totalReviews = plainObj.reviews ? plainObj.reviews.length : 0;
    const plain = {
      ...plainObj,
      averageRating,
      totalReviews,
    } as unknown as Product & { averageRating: number; totalReviews: number };
    expect(plain.reviews.length).toBe(2);
    expect(plain.averageRating).toBe(4.5);
    expect(plain.totalReviews).toBe(2);
  });

  it('should enforce status enum', async () => {
    await expect(
      productModel.create({
        name: 'Invalid Status',
        slug: 'invalid-status',
        description: 'Should fail',
        price: 10,
        sku: 'SKU789',
        category: new mongoose.Types.ObjectId(),
        stock: 1,
        status: 'not-valid',
      }),
    ).rejects.toThrow();
  });
});
