import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProductEntity } from './entity/cartProduct.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InsertInCartDTO } from '../cart/dtos/insert-in-cart.dto';
import { ProductService } from '../product/product.service';
import { UpdateInCartDTO } from '../cart/dtos/update-in-cart.dto';

@Injectable()
export class CartProductService {
  constructor(
    @InjectRepository(CartProductEntity)
    private readonly cartProductRepository: Repository<CartProductEntity>,
    private readonly productService: ProductService,
  ) {}

  // get a cart product by its product id and cart id
  async getByProductIdAndCartId(productId: number, cartId: number) {
    const cartProduct: CartProductEntity =
      await this.cartProductRepository.findOne({
        where: {
          productId,
          cartId,
        },
      });

    if (!cartProduct)
      throw new NotFoundException('no product was found related these cart id');

    return cartProduct;
  }

  // check if cart product exists
  async exist(productId: number, cartId: number): Promise<boolean> {
    if (
      !(await this.cartProductRepository
        .exist({
          where: {
            id: productId,
            cartId,
          },
        })
        .catch((err) => {
          console.log(err);
          throw new InternalServerErrorException('error on database');
        }))
    )
      throw new NotFoundException('cart product doesnt exists');

    return true;
  }

  // create cart product related to a cart
  async create(
    { productId, amount }: InsertInCartDTO,
    cartId: number,
  ): Promise<CartProductEntity> {
    return this.cartProductRepository.save({
      productId,
      amount,
      cartId,
    });
  }

  // delete cart product
  async deleteProductIn(
    productId: number,
    cartId: number,
  ): Promise<DeleteResult> {
    return this.cartProductRepository.delete({ productId, cartId });
  }

  // insert a product in cart
  async insertProductIn(
    { productId, amount }: InsertInCartDTO,
    cartId: number,
  ) {
    // check if product exists
    await this.productService.exist(productId);

    // check if cart product exist
    const isExist: boolean = await this.exist(productId, cartId).catch(
      () => false,
    );

    // if doesn't exists, create a new one
    if (!isExist)
      return this.create(
        {
          productId,
          amount,
        },
        cartId,
      );

    // fetched cart product data
    const cartProduct: CartProductEntity = await this.getByProductIdAndCartId(
      productId,
      cartId,
    );

    // updated cart product data with the new amount
    return this.cartProductRepository.save({ ...cartProduct, amount });
  }

  // update a product in cart
  async updateProductIn(
    { productId, amount }: UpdateInCartDTO,
    cartId: number,
  ) {
    // check if product exists
    await this.productService.exist(productId);

    // check if cart product exist, if not it will throw an exception
    await this.exist(productId, cartId);

    // fetched cart product data
    const cartProduct: CartProductEntity = await this.getByProductIdAndCartId(
      productId,
      cartId,
    );

    // updated cart product data with the new amount
    return this.cartProductRepository.save({ ...cartProduct, amount });
  }
}
