import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { FilterProductDto } from '../dto/filter-product.dto';
import { NotificationService, Notification } from '../../../shared/notification';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private notificationService: NotificationService,
  ) {}

  async createProduct(
    dto: CreateProductDto,
  ): Promise<{ data?: Product; notification: Notification }> {
    try {
      // Ensure required fields for schema
      const product = await this.productModel.create({
        ...dto,
        description: dto.description ?? 'No description',
        sku: `SKU-${Date.now()}`,
        stock: 100,
        images: [],
        attributes: dto.attributes ?? [],
        status: dto.status ?? 'active',
        brand: '',
        reviews: [],
      });
      return {
        data: product.toObject(),
        notification: this.notificationService.notifySuccess('Product created successfully'),
      };
    } catch (error) {
      console.error('Product create error:', error);
      const errMsg =
        error && typeof (error as { message?: string }).message === 'string'
          ? (error as { message: string }).message
          : 'Failed to create product';
      return {
        notification: this.notificationService.notifyError(errMsg, 'PRODUCT_CREATE_ERROR'),
      };
    }
  }

  async getProductById(id: string): Promise<{ data?: Product; notification: Notification }> {
    if (!Types.ObjectId.isValid(id)) {
      return {
        notification: this.notificationService.notifyError(
          'Invalid product ID',
          'INVALID_PRODUCT_ID',
        ),
      };
    }
    const product = await this.productModel.findById(id).lean().exec();
    if (!product) {
      return {
        notification: this.notificationService.notifyError(
          'Product not found',
          'PRODUCT_NOT_FOUND',
        ),
      };
    }
    return {
      data: product,
      notification: this.notificationService.notifySuccess('Product retrieved successfully'),
    };
  }

  async updateProduct(
    id: string,
    dto: UpdateProductDto,
  ): Promise<{ data?: Product; notification: Notification }> {
    if (!Types.ObjectId.isValid(id)) {
      return {
        notification: this.notificationService.notifyError(
          'Invalid product ID',
          'INVALID_PRODUCT_ID',
        ),
      };
    }
    const product = await this.productModel.findByIdAndUpdate(id, dto, { new: true }).lean().exec();
    if (!product) {
      return {
        notification: this.notificationService.notifyError(
          'Product not found',
          'PRODUCT_NOT_FOUND',
        ),
      };
    }
    return {
      data: product,
      notification: this.notificationService.notifySuccess('Product updated successfully'),
    };
  }

  async deleteProduct(id: string): Promise<{ notification: Notification }> {
    if (!Types.ObjectId.isValid(id)) {
      return {
        notification: this.notificationService.notifyError(
          'Invalid product ID',
          'INVALID_PRODUCT_ID',
        ),
      };
    }
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) {
      return {
        notification: this.notificationService.notifyError(
          'Product not found',
          'PRODUCT_NOT_FOUND',
        ),
      };
    }
    return { notification: this.notificationService.notifySuccess('Product deleted successfully') };
  }

  async filterProducts(
    filterDto: FilterProductDto,
  ): Promise<{ data: Product[]; total: number; notification: Notification }> {
    const filter: Record<string, unknown> = {};
    if (filterDto.category) filter.category = filterDto.category;
    if (filterDto.status) filter.status = filterDto.status;
    if (filterDto.minPrice || filterDto.maxPrice) filter.price = {};
    if (filterDto.minPrice) (filter.price as Record<string, number>)['$gte'] = filterDto.minPrice;
    if (filterDto.maxPrice) (filter.price as Record<string, number>)['$lte'] = filterDto.maxPrice;
    if (filterDto.search) filter['$text'] = { $search: filterDto.search };

    const page = filterDto.page || 1;
    const limit = filterDto.limit || 20;
    const skip = (page - 1) * limit;
    const sort: Record<string, 1 | -1> = {};
    if (filterDto.sortBy) sort[filterDto.sortBy] = filterDto.order === 'desc' ? -1 : 1;

    const [products, total] = await Promise.all([
      this.productModel.find(filter).sort(sort).skip(skip).limit(limit).lean().exec(),
      this.productModel.countDocuments(filter),
    ]);
    return {
      data: products,
      total,
      notification: this.notificationService.notifySuccess('Products retrieved successfully'),
    };
  }
}
