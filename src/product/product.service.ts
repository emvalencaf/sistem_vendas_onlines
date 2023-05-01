// decorators and exceptions
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// entities
import { ProductEntity } from './entity/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dtos/create-product.dto';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly categoryService: CategoryService,
  ) {}

  // create a new product
  async create({
    name,
    price,
    image,
    categoryId,
  }: CreateProductDTO): Promise<ProductEntity> {
    // validation
    if (!name || !price || !image || !categoryId)
      throw new BadRequestException(
        'name, price, image and category are required',
      );

    // check if category exists
    await this.categoryService.exist(categoryId);

    // organized data
    const data: CreateProductDTO = {
      name,
      price,
      image,
      categoryId,
    };

    const product: ProductEntity | undefined = await this.productRepository
      .save(data)
      .catch((err) => {
        console.log(err);
        return undefined;
      });

    if (!product) throw new InternalServerErrorException('error on database');

    return product;
  }

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
