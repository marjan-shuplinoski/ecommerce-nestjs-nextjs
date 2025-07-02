import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async createCart(@Body('userId') userId?: string, @Body('isGuest') isGuest?: boolean) {
    return this.cartService.createCart(userId ? new Types.ObjectId(userId) : undefined, isGuest);
  }

  @Get(':id')
  async getCart(@Param('id') id: string) {
    return this.cartService.getCartById(id);
  }

  @Patch(':id/add-item')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async addItem(@Param('id') id: string, @Body() dto: AddToCartDto) {
    return this.cartService.addItem(id, {
      productId: new Types.ObjectId(dto.productId),
      quantity: dto.quantity,
      price: dto.price,
    });
  }

  @Patch(':id/update-item')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async updateItem(@Param('id') id: string, @Body() dto: UpdateCartDto) {
    return this.cartService.updateItem(id, {
      productId: new Types.ObjectId(dto.productId),
      quantity: dto.quantity,
      price: dto.price,
    });
  }

  @Patch(':id/remove-item')
  async removeItem(@Param('id') id: string, @Body('productId') productId: string) {
    return this.cartService.removeItem(id, new Types.ObjectId(productId));
  }

  @Patch(':id/clear')
  @HttpCode(HttpStatus.NO_CONTENT)
  async clearCart(@Param('id') id: string) {
    await this.cartService.clearCart(id);
    return;
  }

  @Patch(':id/recalculate')
  async recalculateTotal(@Param('id') id: string) {
    return this.cartService.recalculateTotal(id);
  }
}
