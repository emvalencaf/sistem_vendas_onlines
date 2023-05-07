import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { CartController } from './cart.controller';
import { CartProductModule } from '../cart-product/cart-product.module';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity]), CartProductModule],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
