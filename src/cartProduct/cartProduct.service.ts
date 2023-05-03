import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProductEntity } from './entity/cartProduct.entity';
import { Repository } from 'typeorm';
import { InsertInCartDTO } from '../cart/dtos/insert-in-cart.dto';
import { CartEntity } from '../cart/entity/cart.entity';

@Injectable()
export class CartProductService {
  constructor(
    @InjectRepository(CartProductEntity)
    private readonly cartProductRepository: Repository<CartProductEntity>,
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

  // check if already exist a cart product
  async isCartProductExist(
    { productId, amount }: InsertInCartDTO,
    cartId: number,
  ): Promise<CartProductEntity> {
    // get cart product by cart id and product id
    const cartProduct: CartProductEntity | undefined =
      await this.getByProductIdAndCartId(productId, cartId).catch(
        () => undefined,
      );

    // if cart product wasnt found it, then create a new one
    if (!cartProduct)
      return this.create(
        {
          productId,
          amount,
        },
        cartId,
      );

    // updated cart product with a new amount value
    return this.cartProductRepository.save({
      ...cartProduct,
      amount: amount,
    });
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

  // insert a product in cart
  async insertProductIn(
    { productId, amount }: InsertInCartDTO,
    cart: CartEntity,
  ) {
    return this.isCartProductExist({ productId, amount }, cart.id);
  }
}
