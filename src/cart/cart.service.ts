// decorators
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// entities
import { CartEntity } from './entity/cart.entity';
import { Repository } from 'typeorm';
import { InsertInCartDTO } from './dtos/insert-in-cart.dto';
import { CartProductService } from '../cartProduct/cartProduct.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    private readonly cartProductService: CartProductService,
  ) {}

  // get cart by user id
  async getByUserId(userId: number): Promise<CartEntity> {
    const cart: CartEntity = await this.cartRepository.findOne({
      where: {
        userId,
      },
    });

    if (!cart) throw new NotFoundException('no cart was found in database');

    return cart;
  }

  // check if there's a cart active related to user
  async isCartActive(userId: number): Promise<CartEntity> {
    const cart: CartEntity = await this.getByUserId(userId)
      .then((result) => result)
      .catch(async () => this.create(userId));

    return cart;
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
    const cart: CartEntity = await this.isCartActive(userId);

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
