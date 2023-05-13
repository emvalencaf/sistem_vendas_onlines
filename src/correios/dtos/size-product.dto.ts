import { IsNumber } from 'class-validator';
import { ProductEntity } from '../../product/entities/product.entity';

export class SizeProductDTO {
  @IsNumber()
  length: number; // length in cm
  @IsNumber()
  height: number; // height in cm
  @IsNumber()
  width: number; // width in cm
  @IsNumber()
  diameter: number; // diameter in cm
  @IsNumber()
  productValue: number;

  constructor(product: ProductEntity) {
    this.diameter = 30;
    this.height = 30;
    this.width = 30;
    this.length = 30;
    this.productValue = product.price;
  }
}
