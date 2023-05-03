// decorators
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// entities
import { CartEntity } from './entity/cart.entity';
import { FindOptionsRelations, Repository } from 'typeorm';
import { InsertInCartDTO } from './dtos/insert-in-cart.dto';
import { CartProductService } from '../cartProduct/cartProduct.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    private readonly cartProductService: CartProductService,
  ) {}

  // get active cart by user id
  async getByUserId(
    userId: number,
    isRelations?: boolean,
  ): Promise<CartEntity> {
    // check if will returned a cart with relations on
    const relations: FindOptionsRelations<CartEntity> | undefined = isRelations
      ? {
          cartProducts: {
            product: true,
          },
        }
      : undefined;

    // fetch cart data from database
    const cart: CartEntity = await this.cartRepository.findOne({
      where: {
        userId,
        active: true,
      },
      relations,
    });

    // thrown an exception if no active cart related to user id was found it
    if (!cart) throw new NotFoundException('no cart was found in database');

    return cart;
  }

  // get cart by id
  async getById(cartId: number): Promise<CartEntity> {
    const cart: CartEntity = await this.cartRepository.findOne({
      where: {
        id: cartId,
      },
    });

    if (!cart) throw new NotFoundException('no cart was found in database');

    return cart;
  }

  // check if there's a cart active related to user
  async isCartActive(cartId: number): Promise<boolean> {
    const cart: CartEntity = await this.getById(cartId);

    return cart.active === true;
  }

  // create a cart
  async create(userId: number): Promise<CartEntity> {
    return this.cartRepository.save({
      active: true,
      userId,
    });
  }

  // insert a product into a cart
  async insertProductIn(
    { productId, amount }: InsertInCartDTO,
    userId: number,
  ): Promise<CartEntity> {
    // get cart by user id
    const cart: CartEntity = await this.getByUserId(userId, true)
      // if ain't not cart or cart activate, create a new one
      .catch(async () => this.create(userId));

    await this.cartProductService.insertProductIn(
      {
        productId,
        amount,
      },
      cart,
    );

    return cart;
  }
}
