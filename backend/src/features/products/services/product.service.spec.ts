import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ProductService } from './product.service';
import { NotificationService } from '../../../shared/notification';
import { Product } from '../schemas/product.schema';
import { CreateProductDto } from '../dto/create-product.dto';
import { FilterProductDto } from '../dto/filter-product.dto';

describe('ProductService', () => {
  let service: ProductService;
  let productModel: Record<string, jest.Mock>;
  let notificationService: NotificationService;

  beforeEach(async () => {
    productModel = {
      create: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
      find: jest.fn(),
      countDocuments: jest.fn(),
    };
    notificationService = new NotificationService();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: getModelToken(Product.name), useValue: productModel },
        { provide: NotificationService, useValue: notificationService },
      ],
    }).compile();
    service = module.get<ProductService>(ProductService);
  });

  it('should create a product', async () => {
    const dto: CreateProductDto = { name: 'Test', price: 10, category: 'cat' } as CreateProductDto;
    productModel.create.mockResolvedValue({ toObject: () => ({ ...dto, _id: 'id' }) });
    const result = await service.createProduct(dto);
    expect(result.data).toMatchObject(dto);
    expect(result.notification.type).toBe('success');
  });

  it('should get a product by id', async () => {
    productModel.findById.mockReturnValue({ lean: () => ({ exec: () => ({ _id: 'id' }) }) });
    const result = await service.getProductById('507f1f77bcf86cd799439011');
    expect(result.data).toBeDefined();
    expect(result.notification.type).toBe('success');
  });

  it('should return error for invalid id', async () => {
    const result = await service.getProductById('badid');
    expect(result.notification.type).toBe('error');
  });

  it('should update a product', async () => {
    productModel.findByIdAndUpdate.mockReturnValue({
      lean: () => ({ exec: () => ({ _id: 'id', name: 'Updated' }) }),
    });
    const result = await service.updateProduct('507f1f77bcf86cd799439011', { name: 'Updated' });
    expect(result.data).toBeDefined();
    expect(result.notification.type).toBe('success');
  });

  it('should delete a product', async () => {
    productModel.findByIdAndDelete.mockReturnValue({ exec: () => ({ _id: 'id' }) });
    const result = await service.deleteProduct('507f1f77bcf86cd799439011');
    expect(result.notification.type).toBe('success');
  });

  it('should filter products', async () => {
    productModel.find.mockReturnValue({
      sort: () => ({
        skip: () => ({ limit: () => ({ lean: () => ({ exec: () => [{ _id: 'id' }] }) }) }),
      }),
    });
    productModel.countDocuments.mockResolvedValue(1);
    const result = await service.filterProducts({} as FilterProductDto);
    expect(result.data).toBeInstanceOf(Array);
    expect(result.notification.type).toBe('success');
  });
});
