import { ProductEntity } from '../entity/product.entity';

export class ReturnedProductDTO {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  image: string;

  constructor(productEntity: ProductEntity) {
    this.id = productEntity.id;
    this.image = productEntity.image;
    this.price = productEntity.price;
    this.categoryId = productEntity.categoryId;
  }
}
