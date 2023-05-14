// decorators
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
// services
import { ProductService } from './product.service';

// dtos
import { ReturnedProductDTO } from './dtos/returned-product.dto';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../enums/user-types.enum';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDTO } from './dtos/create-product.dto';
import { PartialUpdateProductDTO } from './dtos/partial-update-product.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { ReturnedFreightPriceDTO } from './dtos/returned-freight-price.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // get all product from a category
  @Get('/:categoryId')
  async getAllFromCategory(
    @Param('categoryId') categoryId: number,
  ): Promise<ReturnedProductDTO[]> {
    return (await this.productService.getAllFromCategory(categoryId)).map(
      (product) => new ReturnedProductDTO(product),
    );
  }

  // get freight price of an product by id and cep
  @Get('/:productId/delivery/:cep')
  async getFreightPrice(
    @Param('productId') productId: number,
    @Param('cep') cep: string,
  ): Promise<ReturnedFreightPriceDTO> {
    return this.productService.getFreightPrice(cep, productId);
  }

  // create a product
  @UsePipes(ValidationPipe)
  @Post()
  async create(
    @Body()
    {
      name,
      price,
      image,
      categoryId,
      height,
      weight,
      length,
      width,
      diameter,
    }: CreateProductDTO,
  ): Promise<ProductEntity> {
    return await this.productService.create({
      name,
      price,
      image,
      categoryId,
      height,
      weight,
      length,
      width,
      diameter,
    });
  }

  // delete a product
  @Roles(UserType.Admin)
  @UsePipes(ValidationPipe)
  @Post('/:productId')
  async delete(@Param('productId') productId: number): Promise<boolean> {
    return await this.productService.delete(productId);
  }

  // partial update product
  @Roles(UserType.Admin)
  @UsePipes(ValidationPipe)
  @Patch('/:productId')
  async partialUpdate(
    @Body()
    {
      name,
      price,
      image,
      categoryId,
      length,
      diameter,
      weight,
      height,
      width,
    }: PartialUpdateProductDTO,
    @Param('productId') productId: number,
  ): Promise<ProductEntity> {
    return await this.productService.partialUpdate(
      {
        name,
        price,
        image,
        categoryId,
        width,
        height,
        weight,
        diameter,
        length,
      },
      productId,
    );
  }

  // update a product
  @Roles(UserType.Admin)
  @UsePipes(ValidationPipe)
  @Put('/:productId')
  async update(
    @Body()
    {
      name,
      price,
      image,
      categoryId,
      weight,
      diameter,
      length,
      height,
      width,
    }: UpdateProductDTO,
    @Param('productId') productId: number,
  ): Promise<ProductEntity> {
    return await this.productService.update(
      {
        name,
        price,
        image,
        categoryId,
        weight,
        length,
        diameter,
        height,
        width,
      },
      productId,
    );
  }
}
