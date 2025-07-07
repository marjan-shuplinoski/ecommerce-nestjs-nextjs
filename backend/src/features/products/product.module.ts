import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product.controller';
import { ProductService } from './services/product.service';
import { Product, ProductSchema } from './schemas/product.schema';
import { NotificationService } from '../../shared/notification';

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
  controllers: [ProductController],
  providers: [ProductService, NotificationService],
  exports: [ProductService],
})
export class ProductModule {}
