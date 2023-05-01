import { IsNumber, IsString } from 'class-validator';
import { CategoryEntity } from '../entity/category.entity';

export class ReturnedCategoryDTO {
  @IsNumber()
  id: number;
  @IsString()
  name: string;

  constructor(categoryEntity: CategoryEntity) {
    this.id = categoryEntity.id;
    this.name = categoryEntity.name;
  }
}
