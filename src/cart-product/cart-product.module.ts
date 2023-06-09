import { Module } from '@nestjs/common';
import { CartProductService } from './cart-product.service';
import { ProductModule } from '../product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartProductEntity } from './entities/cart-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartProductEntity]), ProductModule],
  controllers: [],
  providers: [CartProductService],
  exports: [CartProductService],
})
export class CartProductModule {}
