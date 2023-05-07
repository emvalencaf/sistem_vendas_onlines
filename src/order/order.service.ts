import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { PaymentService } from '../payment/payment.service';
import { PaymentEntity } from '../payment/entities/payment.entity';
import { CartService } from '../cart/cart.service';
import { CartEntity } from '../cart/entities/cart.entity';
import { OrderProductService } from '../order-product/order-product.service';
import { ProductService } from '../product/product.service';
import { ProductEntity } from '../product/entities/product.entity';
import { OrderProductEntity } from '../order-product/entities/order-product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
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
    if (!addressId) throw new BadRequestException('no address was found');

    // get an activate cart (with all table relations) related to user
    const cart: CartEntity = await this.cartService.getByUserId(userId, true);

    // validation checkin if active cart has products related to it
    if (!cart.cartProducts || cart.cartProducts.length === 0)
      throw new NotFoundException('no product was found related these cart id');

    // get all products in an active cart
    const products: ProductEntity[] = await this.productService.findAllByIdList(
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

    // create an order prodcut
    await this.createOrderProducts(cart, order.id, products);

    // clear cart
    await this.cartService.clear(userId);

    return order;
  }
}
