import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CategoryService } from './category.service';
import { Category } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { NotificationService } from '../../shared/notification';

const mockCategoryModel = {
  create: jest.fn(),
  find: jest.fn().mockReturnThis(),
  exec: jest.fn(),
  findById: jest.fn().mockReturnThis(),
  findByIdAndUpdate: jest.fn().mockReturnThis(),
};

const mockNotificationService = {
  notifySuccess: jest.fn((msg: string, code?: string | number) => ({
    type: 'success',
    message: msg,
    code,
  })),
  notifyError: jest.fn((msg: string, code?: string | number) => ({
    type: 'error',
    message: msg,
    code,
  })),
  notifyWarning: jest.fn((msg: string, code?: string | number) => ({
    type: 'warning',
    message: msg,
    code,
  })),
};

describe('CategoryService', () => {
  let service: CategoryService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let model: typeof mockCategoryModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getModelToken(Category.name),
          useValue: mockCategoryModel,
        },
        {
          provide: NotificationService,
          useValue: mockNotificationService,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    model = module.get(getModelToken(Category.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a category', async () => {
      const dto = { name: 'Test', slug: 'Test-Cat' } as unknown as CreateCategoryDto;
      const normalized = { ...dto, slug: 'testcat' };
      const createdDoc = { _id: '1', name: 'Test', slug: 'testcat' };
      const fullDoc = {
        ...createdDoc,
        isActive: true,
        sortOrder: 0,
        productCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const expected = {
        data: fullDoc,
        notification: {
          type: 'success',
          message: 'Category created successfully',
          code: undefined,
        },
      };
      mockCategoryModel.create.mockResolvedValue(createdDoc);
      mockCategoryModel.findById.mockReturnThis();
      mockCategoryModel.exec.mockResolvedValue(fullDoc);
      mockNotificationService.notifySuccess.mockReturnValue(expected.notification);
      await expect(service.create(dto)).resolves.toEqual(expected);
      expect(mockCategoryModel.create).toHaveBeenCalledWith(normalized);
    });
  });

  describe('findAll', () => {
    it('should return all categories', async () => {
      const categories = {
        data: [{ _id: '1', name: 'A' }],
        notification: {
          type: 'success',
          message: 'Categories fetched successfully',
          code: undefined,
        },
      };
      mockCategoryModel.find.mockReturnThis();
      mockCategoryModel.exec.mockResolvedValue(categories.data);
      mockNotificationService.notifySuccess.mockReturnValue(categories.notification);
      await expect(service.findAll()).resolves.toEqual(categories);
    });
  });

  describe('findOne', () => {
    it('should return a category', async () => {
      const category = {
        data: { _id: '1', name: 'A', isDeleted: false },
        notification: {
          type: 'success',
          message: 'Category fetched successfully',
          code: undefined,
        },
      };
      mockCategoryModel.findById.mockReturnThis();
      mockCategoryModel.exec.mockResolvedValue(category.data);
      mockNotificationService.notifySuccess.mockReturnValue(category.notification);
      await expect(service.findOne('1')).resolves.toEqual(category);
    });
    it('should return error notification if not found', async () => {
      mockCategoryModel.findById.mockReturnThis();
      mockCategoryModel.exec.mockResolvedValue(null);
      const errorNotification = {
        type: 'error',
        message: 'Category not found',
        code: 'NOT_FOUND',
      };
      mockNotificationService.notifyError.mockReturnValue(errorNotification);
      await expect(service.findOne('1')).resolves.toEqual({ notification: errorNotification });
    });
    it('should return error notification if deleted', async () => {
      const deleted = { _id: '1', name: 'A', isDeleted: true };
      mockCategoryModel.findById.mockReturnThis();
      mockCategoryModel.exec.mockResolvedValue(deleted);
      const errorNotification = {
        type: 'error',
        message: 'Category not found',
        code: 'NOT_FOUND',
      };
      mockNotificationService.notifyError.mockReturnValue(errorNotification);
      await expect(service.findOne('1')).resolves.toEqual({ notification: errorNotification });
    });
  });

  describe('update', () => {
    it('should update and return the category', async () => {
      const updated = {
        data: { _id: '1', name: 'B' },
        notification: {
          type: 'success',
          message: 'Category updated successfully',
          code: undefined,
        },
      };
      const updateDto = { name: 'B' } as unknown as UpdateCategoryDto;
      mockCategoryModel.findByIdAndUpdate.mockReturnThis();
      mockCategoryModel.exec.mockResolvedValue(updated.data);
      mockNotificationService.notifySuccess.mockReturnValue(updated.notification);
      await expect(service.update('1', updateDto)).resolves.toEqual(updated);
    });
    it('should return error notification if not found', async () => {
      const updateDto = { name: 'B' } as unknown as UpdateCategoryDto;
      mockCategoryModel.findByIdAndUpdate.mockReturnThis();
      mockCategoryModel.exec.mockResolvedValue(null);
      const errorNotification = {
        type: 'error',
        message: 'Category not found',
        code: 'NOT_FOUND',
      };
      mockNotificationService.notifyError.mockReturnValue(errorNotification);
      await expect(service.update('1', updateDto)).resolves.toEqual({
        notification: errorNotification,
      });
    });
  });

  describe('remove', () => {
    it('should soft delete the category', async () => {
      const notification = {
        type: 'success',
        message: 'Category deleted successfully',
        code: undefined,
      };
      mockCategoryModel.findByIdAndUpdate.mockReturnThis();
      mockCategoryModel.exec.mockResolvedValue({ _id: '1' });
      mockNotificationService.notifySuccess.mockReturnValue(notification);
      await expect(service.remove('1')).resolves.toEqual({ notification });
    });
    it('should return error notification if not found', async () => {
      mockCategoryModel.findByIdAndUpdate.mockReturnThis();
      mockCategoryModel.exec.mockResolvedValue(null);
      const errorNotification = {
        type: 'error',
        message: 'Category not found',
        code: 'NOT_FOUND',
      };
      mockNotificationService.notifyError.mockReturnValue(errorNotification);
      await expect(service.remove('1')).resolves.toEqual({ notification: errorNotification });
    });
  });
});
