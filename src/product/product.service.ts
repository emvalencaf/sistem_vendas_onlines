// decorators and exceptions
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// services
import { CategoryService } from '../category/category.service';

// dtos
import { CreateProductDTO } from './dtos/create-product.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { PartialUpdateProductDTO } from './dtos/partial-update-product.dto';

// entities
import { ProductEntity } from './entity/product.entity';
import { Repository, UpdateResult } from 'typeorm';

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

  // delete a product
  async delete(productId: number): Promise<boolean> {
    await this.exist(productId);

    const isDelete: boolean | undefined = await this.productRepository
      .delete({
        id: productId,
      })
      .then(() => true)
      .catch(() => false);

    return isDelete;
  }

  // get a product by id
  async getById(productId: number): Promise<ProductEntity> {
    const product: ProductEntity = await this.productRepository
      .findOne({
        where: {
          id: productId,
        },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException('error on database');
      });

    if (!product)
      throw new NotFoundException('no product found in the database');

    return product;
  }

  // check if product exists
  async exist(productId: number): Promise<boolean> {
    if (
      !(await this.productRepository
        .exist({
          where: {
            id: productId,
          },
        })
        .catch((err) => {
          console.log(err);
          throw new InternalServerErrorException('error on database');
        }))
    )
      throw new NotFoundException('product doesnt exists');

    return true;
  }

  // partial update a product
  async partialUpdate(
    { name, price, image, categoryId }: PartialUpdateProductDTO,
    productId: number,
  ): Promise<ProductEntity> {
    await this.exist(productId);

    const data: PartialUpdateProductDTO = {};

    if (name) data.name = name;

    if (price) data.price = price;

    if (image) data.image = image;

    if (categoryId) data.categoryId = categoryId;

    const result: UpdateResult | undefined = await this.productRepository
      .update(
        {
          id: productId,
        },
        data,
      )
      .then((result) => result)
      .catch((err) => {
        console.log(err);
        return undefined;
      });

    console.log(result);

    if (!result || result?.affected === 0)
      throw new InternalServerErrorException('error on database');

    const updated: ProductEntity = await this.getById(productId);

    return updated;
  }

  // full update a product
  async update(
    { name, price, image, categoryId }: UpdateProductDTO,
    productId: number,
  ): Promise<ProductEntity> {
    await this.exist(productId);

    if (!name || !price || !image || !categoryId)
      throw new BadRequestException(
        'name, price, image and category are required',
      );

    const data: UpdateProductDTO = {
      name,
      price,
      image,
      categoryId,
    };

    const result: UpdateResult | undefined = await this.productRepository
      .update(
        {
          id: productId,
        },
        data,
      )
      .then((result) => result)
      .catch((err) => {
        console.log(err);
        return undefined;
      });
    if (!result || result?.affected === 0)
      throw new InternalServerErrorException('error on database');

    const updated: ProductEntity = await this.getById(productId);

    return updated;
  }
}
