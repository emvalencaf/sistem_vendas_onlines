import { IsNumber, IsString } from 'class-validator';
import { CategoryEntity } from '../entity/category.entity';

export class ReturnedCategoryDTO {
  @IsNumber()
  id: number;
  @IsString()
  name: string;
  @IsNumber()
  amountProducts?: number;

  constructor(categoryEntity: CategoryEntity, amountProducts?: number) {
    this.id = categoryEntity.id;
    this.name = categoryEntity.name;
    this.amountProducts = amountProducts;
  }
}
