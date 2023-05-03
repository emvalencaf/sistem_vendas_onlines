import { Module } from '@nestjs/common';
import { CartProductService } from './cartProduct.service';

@Module({
  imports: [],
  controllers: [],
  providers: [CartProductService],
  exports: [CartProductService],
})
export class CartProductModule {}
