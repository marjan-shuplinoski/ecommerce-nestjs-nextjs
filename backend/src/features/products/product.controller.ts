import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';
import { ProductService } from './services/product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

export enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
  SELLER = 'seller',
}

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully.' })
  @ApiBody({ type: CreateProductDto })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() dto: CreateProductDto, @Res() res: Response) {
    const result = await this.productService.createProduct(dto);
    if (!result.data) {
      return res.status(400).json(result);
    }
    return res.status(201).json(result);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Product retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const result = await this.productService.getProductById(id);
    if (!result.data) {
      return res.status(404).json(result);
    }
    return res.status(200).json(result);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update product by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ status: 200, description: 'Product updated successfully.' })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productService.updateProduct(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete product by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Product deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string, @Res() res: Response) {
    const result = await this.productService.deleteProduct(id);
    if (result.notification.type === 'error' && result.notification.code === 'PRODUCT_NOT_FOUND') {
      return res.status(404).json(result);
    }
    return res.status(200).json(result);
  }

  @Get()
  @ApiOperation({ summary: 'Filter and search products' })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'minPrice', required: false, type: Number })
  @ApiQuery({ name: 'maxPrice', required: false, type: Number })
  @ApiQuery({ name: 'attributes', required: false, type: [String] })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'sortBy', required: false })
  @ApiQuery({ name: 'order', required: false })
  async filter(@Query() filterDto: FilterProductDto) {
    return this.productService.filterProducts(filterDto);
  }
}
