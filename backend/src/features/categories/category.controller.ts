import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseInterceptors,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './category.entity';
import { Notification } from '../../shared/notification';

function toCategoryEntityPlain(obj: Record<string, unknown> | undefined): Partial<CategoryEntity> {
  if (!obj) return {};
  return {
    ...obj,
    _id:
      obj._id && typeof obj._id === 'object' && 'toString' in obj._id
        ? (obj._id as { toString: () => string }).toString()
        : typeof obj._id === 'string'
          ? obj._id
          : undefined,
    parentCategory:
      obj.parentCategory &&
      typeof obj.parentCategory === 'object' &&
      'toString' in obj.parentCategory
        ? (obj.parentCategory as { toString: () => string }).toString()
        : typeof obj.parentCategory === 'string'
          ? obj.parentCategory
          : undefined,
  };
}

@ApiTags('Categories')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({ status: 201, type: CategoryEntity })
  async create(
    @Body() dto: CreateCategoryDto,
  ): Promise<{ data?: CategoryEntity; notification: Notification }> {
    const result = await this.categoryService.create(dto);
    let plain: Record<string, unknown> | undefined = undefined;
    if (
      result.data &&
      typeof result.data === 'object' &&
      'toObject' in result.data &&
      typeof (result.data as { toObject?: unknown }).toObject === 'function'
    ) {
      plain = (result.data as { toObject: () => Record<string, unknown> }).toObject();
    } else if (result.data) {
      plain = { ...result.data };
    }
    return {
      data: plain ? new CategoryEntity(toCategoryEntityPlain(plain)) : undefined,
      notification: result.notification,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, type: [CategoryEntity] })
  async findAll(): Promise<{ data: CategoryEntity[]; notification: Notification }> {
    const result = await this.categoryService.findAll();
    return {
      data: result.data
        .map((cat) => {
          let plain: Record<string, unknown> | undefined = undefined;
          if (
            cat &&
            typeof cat === 'object' &&
            'toObject' in cat &&
            typeof (cat as { toObject?: unknown }).toObject === 'function'
          ) {
            plain = (cat as { toObject: () => Record<string, unknown> }).toObject();
          } else if (cat) {
            plain = { ...cat };
          }
          return plain ? new CategoryEntity(toCategoryEntityPlain(plain)) : undefined;
        })
        .filter((c): c is CategoryEntity => !!c),
      notification: result.notification,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a category by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: CategoryEntity })
  async findOne(
    @Param('id') id: string,
  ): Promise<{ data?: CategoryEntity; notification: Notification }> {
    const result = await this.categoryService.findOne(id);
    if (!result.data) {
      throw new NotFoundException(result.notification.message);
    }
    let plain: Record<string, unknown> | undefined = undefined;
    if (
      result.data &&
      typeof result.data === 'object' &&
      'toObject' in result.data &&
      typeof (result.data as { toObject?: unknown }).toObject === 'function'
    ) {
      plain = (result.data as { toObject: () => Record<string, unknown> }).toObject();
    } else if (result.data) {
      plain = { ...result.data };
    }
    return {
      data: plain ? new CategoryEntity(toCategoryEntityPlain(plain)) : undefined,
      notification: result.notification,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a category by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({ status: 200, type: CategoryEntity })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDto,
  ): Promise<{ data?: CategoryEntity; notification: Notification }> {
    const result = await this.categoryService.update(id, dto);
    let plain: Record<string, unknown> | undefined = undefined;
    if (
      result.data &&
      typeof result.data === 'object' &&
      'toObject' in result.data &&
      typeof (result.data as { toObject?: unknown }).toObject === 'function'
    ) {
      plain = (result.data as { toObject: () => Record<string, unknown> }).toObject();
    } else if (result.data) {
      plain = { ...result.data };
    }
    return {
      data: plain ? new CategoryEntity(toCategoryEntityPlain(plain)) : undefined,
      notification: result.notification,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete (soft) a category by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 204 })
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<{ notification: Notification }> {
    return this.categoryService.remove(id);
  }

  // RBAC decorators and guards will be added in the next step
}
