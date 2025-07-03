import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';

// Ensure CreateCategoryDto is a class and properly exported in create-category.dto.ts
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
