import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationService, Notification } from '../../shared/notification';
import { Category } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    private readonly notificationService: NotificationService,
  ) {}

  async create(dto: CreateCategoryDto): Promise<{ data?: Category; notification: Notification }> {
    try {
      // Normalize slug: lowercase, remove non-alphanumeric except dash, no spaces
      const normalizedSlug = dto.slug
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '')
        .trim();
      const created = await this.categoryModel.create({ ...dto, slug: normalizedSlug });
      // Fetch the full document to ensure all fields (including defaults) are present
      const fullDoc = await this.categoryModel.findById(created._id).exec();
      return {
        data: fullDoc || undefined,
        notification: this.notificationService.notifySuccess('Category created successfully'),
      };
    } catch (e: unknown) {
      if (
        typeof e === 'object' &&
        e !== null &&
        'code' in e &&
        (e as Record<string, unknown>).code === 11000
      ) {
        return {
          notification: this.notificationService.notifyError('Duplicate slug', 'DUPLICATE_SLUG'),
        };
      }
      return {
        notification: this.notificationService.notifyError('Failed to create category'),
      };
    }
  }

  async findAll(): Promise<{ data: Category[]; notification: Notification }> {
    const cats = await this.categoryModel.find({ isDeleted: { $ne: true } }).exec();
    return {
      data: cats,
      notification: this.notificationService.notifySuccess('Categories fetched successfully'),
    };
  }

  async findOne(id: string): Promise<{ data?: Category; notification: Notification }> {
    const category = await this.categoryModel.findById(id).exec();
    if (!category || category.isDeleted) {
      return {
        notification: this.notificationService.notifyError('Category not found', 'NOT_FOUND'),
      };
    }
    return {
      data: category,
      notification: this.notificationService.notifySuccess('Category fetched successfully'),
    };
  }

  async update(
    id: string,
    dto: UpdateCategoryDto,
  ): Promise<{ data?: Category; notification: Notification }> {
    const category = await this.categoryModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!category) {
      return {
        notification: this.notificationService.notifyError('Category not found', 'NOT_FOUND'),
      };
    }
    return {
      data: category,
      notification: this.notificationService.notifySuccess('Category updated successfully'),
    };
  }

  async remove(id: string): Promise<{ notification: Notification }> {
    const result = await this.categoryModel.findByIdAndUpdate(id, { isDeleted: true }).exec();
    if (!result) {
      return {
        notification: this.notificationService.notifyError('Category not found', 'NOT_FOUND'),
      };
    }
    return {
      notification: this.notificationService.notifySuccess('Category deleted successfully'),
    };
  }
}
