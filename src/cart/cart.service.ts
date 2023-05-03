// decorators
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// entities
import { CartEntity } from './entity/cart.entity';
import {
  DeleteResult,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { InsertInCartDTO } from './dtos/insert-in-cart.dto';
import { CartProductService } from '../cartProduct/cartProduct.service';
import { ExistCartDTO } from './dtos/exist-cart.dto';
import { UpdateInCartDTO } from './dtos/update-in-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    private readonly cartProductService: CartProductService,
  ) {}

  // clear cart
  async clear(userId: number): Promise<boolean> {
    // get cart active by userId
    const cart: CartEntity = await this.getByUserId(userId);
    // update a cart toggle it active
    const result: boolean = await this.cartRepository
      .save({
        ...cart,
        active: false,
      })
      // if was successfully updated, returns true
      .then(() => true)
      // if wasnt updated, throw a internal error excetion
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException('error on database');
      });

    return result;
  }

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

  // exists active cart
  async exist({ cartId, userId, isActive }: ExistCartDTO): Promise<boolean> {
    // custom the where options
    const whereOptions: FindOptionsWhere<CartEntity> = {};
    if (cartId) whereOptions.id = cartId;
    if (userId) whereOptions.userId = userId;
    if (typeof isActive === 'boolean') whereOptions.active = isActive;
    const isExist: boolean = await this.cartRepository
      .exist({
        where: whereOptions,
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException('error on database');
      });
    return isExist;
  }

  // insert a product into a cart
  async insertProductIn(
    { productId, amount }: InsertInCartDTO,
    userId: number,
  ): Promise<CartEntity> {
    // get cart by user id
    const cart: CartEntity = await this.getByUserId(userId)
      // if ain't not cart or cart activate, create a new one
      .catch(async () => this.create(userId));

    // insert a new cart product or increase the amount
    await this.cartProductService.insertProductIn(
      {
        productId,
        amount,
      },
      cart.id,
    );

    // fetched new cart
    return this.getByUserId(userId, true);
  }

  // upate cart
  async updateProductIn(
    { productId, amount }: UpdateInCartDTO,
    userId: number,
  ): Promise<CartEntity> {
    // get cart by user id
    const cart: CartEntity = await this.getByUserId(userId);

    // insert a new cart product or increase the amount
    await this.cartProductService.updateProductIn(
      {
        productId,
        amount,
      },
      cart.id,
    );

    // fetched new cart
    return this.getByUserId(userId, true);
  }

  // delete product in a cart
  async deleteProductIn(
    productId: number,
    userId: number,
  ): Promise<DeleteResult> {
    const cart: CartEntity = await this.getByUserId(userId);

    return this.cartProductService.deleteProductIn(productId, cart.id);
  }
}
