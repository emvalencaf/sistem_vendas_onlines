// decorators and exceptions
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// entities
import { ProductEntity } from './entity/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dtos/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  // create a new product
  async create({}: CreateProductDTO): Promise<ProductEntity> {}

  // get all products from a category id
  async getAllFromCategory(categoryId: number): Promise<ProductEntity[]> {
    const products: ProductEntity[] | undefined = await this.productRepository
      .find({
        where: {
          categoryId,
        },
      })
      .catch((err) => {
        console.log(err);
        return undefined;
      });
    if (!products) throw new InternalServerErrorException('error on database');

    if (products?.length === 0)
      throw new NotFoundException('no product found in database');

    return products;
  }
}
