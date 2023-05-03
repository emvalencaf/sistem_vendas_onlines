import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProductEntity } from './entity/cartProduct.entity';
import { Repository } from 'typeorm';
import { InsertInCartDTO } from '../cart/dtos/insert-in-cart.dto';
import { CartEntity } from '../cart/entity/cart.entity';
import { ProductService } from '../product/product.service';

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

  // check if cart product exists
  async exist(productId: number, cartId: number): Promise<boolean> {
    if (
      !(await this.cartProductRepository.exist({
        where: {
          id: productId,
          cartId,
        },
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

  // insert a product in cart
  async insertProductIn(
    { productId, amount }: InsertInCartDTO,
    cart: CartEntity,
  ) {
    // check if product exists
    await this.productService.exist(productId);

    // check if cart product exist
    const isExist: boolean = await this.exist(productId, cart.id).catch(
      () => false,
    );

    // if doesn't exists, create a new one
    if (!isExist)
      return this.create(
        {
          productId,
          amount,
        },
        cart.id,
      );

    // fetched cart product data
    const cartProduct: CartProductEntity = await this.getByProductIdAndCartId(
      productId,
      cart.id,
    );

    // updated cart product data with the new amount
    return this.cartProductRepository.save({ ...cartProduct, amount });
  }
}
