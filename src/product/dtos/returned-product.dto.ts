import { ReturnedCategoryDTO } from '../../category/dtos/returned-category.dto';
import { ProductEntity } from '../entities/product.entity';

export class ReturnedProductDTO {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  image: string;
  category?: ReturnedCategoryDTO;

  constructor(productEntity: ProductEntity) {
    this.id = productEntity.id;
    this.image = productEntity.image;
    this.price = productEntity.price;
    this.categoryId = productEntity.categoryId;
    this.category = productEntity.category
      ? new ReturnedCategoryDTO(productEntity.category)
      : undefined;
  }
}
