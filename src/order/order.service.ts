import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
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

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly paymentService: PaymentService,
    private readonly cartService: CartService,
    private readonly orderProductService: OrderProductService,
  ) {}

  // create an order
  async create(
    { addressId, code, datePayment, amountPayment }: CreateOrderDTO,
    cartId: number,
    userId: number,
  ): Promise<OrderEntity> {
    // validations
    if (!addressId) throw new BadRequestException('no address was found');

    // create a payment
    const payment: PaymentEntity = await this.paymentService.create({
      code,
      datePayment,
      amountPayment,
    });

    // create an order
    const order: OrderEntity = await this.orderRepository
      .save({
        addressId,
        date: new Date(),
        paymentId: payment.id,
        userId,
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException('error on database');
      });

    // get an activate cart (with all table relations) related to user
    const cart: CartEntity = await this.cartService.getByUserId(userId, true);

    // create an order product
    cart.cartProducts.forEach((cartProduct) => {
      this.orderProductService.create({
        productId: cartProduct.productId,
        orderId: order.id,
        amount: cartProduct.amount,
        price: 0,
      });
    });

    return order;
  }
}
