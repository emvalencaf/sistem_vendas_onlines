// decorators
import { Controller, Get, Param, Post } from '@nestjs/common';
// services
import { ProductService } from './product.service';

// dtos
import { ReturnedProductDTO } from './dtos/returned-product.dto';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../enums/user-types.enum';
import { ProductEntity } from './entity/product.entity';
import { CreateProductDTO } from './dtos/create-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/:categoryId')
  async getAllFromCategory(
    @Param('categoryId') categoryId: number,
  ): Promise<ReturnedProductDTO[]> {
    return (await this.productService.getAllFromCategory(categoryId)).map(
      (product) => new ReturnedProductDTO(product),
    );
  }

  @Roles(UserType.Admin)
  @Post('/:categoryId')
  async create(
    {}: CreateProductDTO,
    @Param('categoryId') categoryId: number,
  ): Promise<ProductEntity> {
    return await this.productService.create({});
  }
}
