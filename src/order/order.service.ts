// decorators and exceptions
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// services
import { CartService } from '../cart/cart.service';
import { PaymentService } from '../payment/payment.service';
import { OrderProductService } from '../order-product/order-product.service';
import { ProductService } from '../product/product.service';

// dtos
import { CreateOrderDTO } from './dtos/create-order.dto';

// entities
import { OrderEntity } from './entities/order.entity';
import { CartEntity } from '../cart/entities/cart.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { PaymentEntity } from '../payment/entities/payment.entity';
import { ProductEntity } from '../product/entities/product.entity';
import { OrderProductEntity } from '../order-product/entities/order-product.entity';
import { AddressService } from '../address/address.service';
import { ReturnedGroupOrderDTO } from '../order-product/dtos/returned-group-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly addressService: AddressService,
    private readonly paymentService: PaymentService,
    private readonly cartService: CartService,
    private readonly orderProductService: OrderProductService,
    private readonly productService: ProductService,
  ) {}

  // save an order
  async save(
    { addressId }: CreateOrderDTO,
    userId: number,
    paymentId: number,
  ): Promise<OrderEntity> {
    return this.orderRepository
      .save({
        addressId,
        date: new Date(),
        paymentId: paymentId,
        userId,
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException('error on database');
      });
  }

  // create a list of order products
  async createOrderProducts(
    cart: CartEntity,
    orderId: number,
    products: ProductEntity[],
  ): Promise<OrderProductEntity[]> {
    return Promise.all(
      cart.cartProducts?.map((cartProduct) =>
        this.orderProductService.create({
          productId: cartProduct.productId,
          orderId,
          amount: cartProduct.amount,
          price:
            products.find((product) => product.id === cartProduct.productId)
              ?.price || 0,
        }),
      ),
    );
  }

  // create an order
  async create(
    { addressId, code, datePayment, amountPayment }: CreateOrderDTO,
    userId: number,
  ): Promise<OrderEntity> {
    // validations
    if (!addressId) throw new BadRequestException('address is required');

    await this.addressService.exist(addressId);

    // get an activate cart (with all table relations) related to user
    const cart: CartEntity = await this.cartService.getByUserId(userId, true);

    // validation checkin if active cart has products related to it
    if (!cart?.cartProducts || cart?.cartProducts?.length === 0)
      throw new NotFoundException(
        'no product was found related to this cart id',
      );

    // get all products in an active cart
    const products: ProductEntity[] = await this.productService.findAll(
      cart.cartProducts.map((cartProduct) => cartProduct.productId),
    );

    // create a payment
    const payment: PaymentEntity = await this.paymentService.create(
      {
        code,
        datePayment,
        amountPayment,
      },
      products,
      cart,
    );

    // create an order
    const order: OrderEntity = await this.save(
      { addressId },
      userId,
      payment.id,
    );

    // create an order product
    await this.createOrderProducts(cart, order.id, products);

    // clear cart
    await this.cartService.clear(userId);

    return order;
  }

  // get an order (with its relations) by user id
  async findByUserId(userId: number): Promise<OrderEntity[]> {
    const orders: OrderEntity[] = await this.orderRepository.find({
      where: {
        userId,
      },
      relations: {
        address: true,
        orderProducts: {
          product: true,
        },
        payment: {
          status: true,
        },
      },
    });

    if (!orders || orders.length === 0)
      throw new NotFoundException('no order found in database');

    return orders;
  }

  // get all orders
  async getAll(isRelations?: boolean): Promise<OrderEntity[]> {
    const findOptions: FindManyOptions<OrderEntity> = {};

    // defined find many options
    if (isRelations)
      findOptions.relations = {
        user: true,
      };

    // getting orders
    const orders: OrderEntity[] = await this.orderRepository.find(findOptions);

    if (!orders || orders.length === 0)
      throw new NotFoundException('no order found in database');

    // get order products amount
    const ordersProduct: ReturnedGroupOrderDTO[] =
      await this.orderProductService.getAmountProductById(
        orders.map((order) => order.id),
      );

    return orders.map((order) => {
      // order product to get amount
      const orderProduct = ordersProduct.find(
        (currentOrder) => currentOrder.order_id === order.id,
      );

      if (orderProduct)
        return {
          ...order,
          amountProducts: Number(orderProduct.total),
        };

      return order;
    });
  }

  // get order by id
  async getById(orderId: number, isRelations?: boolean): Promise<OrderEntity> {
    const findOptions: FindOneOptions<OrderEntity> = {
      where: {
        id: orderId,
      },
    };
    if (isRelations)
      findOptions.relations = {
        user: true,
        orderProducts: {
          product: true,
        },
        payment: {
          status: true,
        },
        address: true,
      };

    const order: OrderEntity = await this.orderRepository.findOne(findOptions);

    if (!order) throw new NotFoundException('no order found in database');

    return order;
  }
}
