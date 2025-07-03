import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './category.entity';

describe('CategoryController', () => {
  let controller: CategoryController;

  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create and return result', async () => {
      const dto = { name: 'Test' } as unknown as CreateCategoryDto;
      const created = {
        data: { _id: '1', name: 'Test' },
        notification: { type: 'success', message: 'ok' },
      };
      (service.create as jest.Mock).mockResolvedValue(created);
      await expect(controller.create(dto)).resolves.toEqual({
        data: created.data ? new CategoryEntity(created.data) : undefined,
        notification: created.notification,
      });
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.create as jest.Mock).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should call service.findAll and return result', async () => {
      const categories = {
        data: [{ _id: '1', name: 'A' }],
        notification: { type: 'success', message: 'ok' },
      };
      (service.findAll as jest.Mock).mockResolvedValue(categories);
      await expect(controller.findAll()).resolves.toEqual({
        data: categories.data.map((cat) => new CategoryEntity(cat)),
        notification: categories.notification,
      });
    });
  });

  describe('findOne', () => {
    it('should call service.findOne and return result', async () => {
      const category = {
        data: { _id: '1', name: 'A' },
        notification: { type: 'success', message: 'ok' },
      };
      (service.findOne as jest.Mock).mockResolvedValue(category);
      await expect(controller.findOne('1')).resolves.toEqual({
        data: category.data ? new CategoryEntity(category.data) : undefined,
        notification: category.notification,
      });
    });
  });

  describe('update', () => {
    it('should call service.update and return result', async () => {
      const updated = {
        data: { _id: '1', name: 'B' },
        notification: { type: 'success', message: 'ok' },
      };
      const updateDto = { name: 'B' } as unknown as UpdateCategoryDto;
      (service.update as jest.Mock).mockResolvedValue(updated);
      await expect(controller.update('1', updateDto)).resolves.toEqual({
        data: updated.data ? new CategoryEntity(updated.data) : undefined,
        notification: updated.notification,
      });
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.update as jest.Mock).toHaveBeenCalledWith('1', updateDto);
    });
  });

  describe('remove', () => {
    it('should call service.remove and return result', async () => {
      const notification = { type: 'success', message: 'deleted' };
      (service.remove as jest.Mock).mockResolvedValue({ notification });
      await expect(controller.remove('1')).resolves.toEqual({ notification });
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.remove as jest.Mock).toHaveBeenCalledWith('1');
    });
  });
});
