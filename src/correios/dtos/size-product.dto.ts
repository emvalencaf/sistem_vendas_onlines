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
  weight: number; // weight in kgs
  @IsNumber()
  productValue: number;

  constructor({
    price,
    diameter,
    width,
    height,
    length,
    weight,
  }: ProductEntity) {
    this.diameter = diameter;
    this.height = height;
    this.weight = weight;
    this.width = width;
    this.length = length;
    this.productValue = price;
  }
}
