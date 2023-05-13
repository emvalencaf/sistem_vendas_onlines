// decorators and exceptions
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// services
import { CategoryService } from '../category/category.service';

// dtos
import { CreateProductDTO } from './dtos/create-product.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { PartialUpdateProductDTO } from './dtos/partial-update-product.dto';

// entities
import { ProductEntity } from './entities/product.entity';
import { FindManyOptions, In, Repository, UpdateResult } from 'typeorm';
import { CountProductDTO } from './dtos/count-product.dto';
import { SizeProductDTO } from '../correios/dtos/size-product.dto';
import { CorreioService } from '../correios/correio.service';
import { CdServiceEnum } from '../enums/correios/cd-service.enum';
import { ReturnedFreightPriceDTO } from './dtos/returned-freight-price.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @Inject(forwardRef(() => CategoryService))
    private readonly categoryService: CategoryService,
    private readonly correiosService: CorreioService,
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

  // find all products by a list of product id
  async findAll(
    productIds?: number[],
    isFindRelations?: boolean,
  ): Promise<ProductEntity[]> {
    const findOptions: FindManyOptions<ProductEntity> = {};

    if (productIds && productIds.length > 0)
      findOptions.where = {
        id: In(productIds),
      };

    if (isFindRelations)
      findOptions.relations = {
        category: true,
      };

    const products: ProductEntity[] = await this.productRepository.find(
      findOptions,
    );

    if (!products || products.length === 0)
      throw new NotFoundException('no product found in database');

    return products;
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

  // get the count products by category id
  async countByCategoryId(): Promise<CountProductDTO[]> {
    try {
      const count: CountProductDTO[] = await this.productRepository
        .createQueryBuilder('product')
        .select('product.category_Id', 'COUNT(*) as total')
        .groupBy('product.category_id')
        .getRawMany();

      return count;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('error on database');
    }
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

  // get price delivery
  async getFreightPrice(
    cep: string,
    productId: number,
  ): Promise<ReturnedFreightPriceDTO> {
    // getting product by id
    const product = await this.getById(productId);

    // getting de sizes details of the product
    const sizeProduct = new SizeProductDTO(product);

    const returnedFreightPrices = await Promise.all([
      this.correiosService.getFreightPrice(CdServiceEnum.PAC, cep, sizeProduct),
      this.correiosService.getFreightPrice(
        CdServiceEnum.SEDEX,
        cep,
        sizeProduct,
      ),
      this.correiosService.getFreightPrice(
        CdServiceEnum.SEDEX_10,
        cep,
        sizeProduct,
      ),
    ]).catch((err) => {
      console.log(err);
      throw new BadRequestException('Error on get freight');
    });

    return new ReturnedFreightPriceDTO(returnedFreightPrices);
  }
}
