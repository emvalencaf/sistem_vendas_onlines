import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProductEntity } from './entities/order-product.entity';
import { Repository } from 'typeorm';
import { CreateOrderProductDTO } from './dtos/create-order-product.dto';
import { ReturnedGroupOrderDTO } from './dtos/returned-group-order.dto';

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(OrderProductEntity)
    private readonly orderProductRepository: Repository<OrderProductEntity>,
  ) {}

  // create a order product
  async create({
    productId,
    orderId,
    price,
    amount,
  }: CreateOrderProductDTO): Promise<OrderProductEntity> {
    // validation
    if (!productId || !orderId || !price || !amount)
      throw new BadRequestException(
        'product id or order id or price or amount was not found it',
      );

    // create an order product
    return this.orderProductRepository
      .save({
        productId,
        orderId,
        price,
        amount,
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException('error on database');
      });
  }

  // get amount of products by order id
  async getAmountProductById(
    orderId: number[],
  ): Promise<ReturnedGroupOrderDTO[]> {
    return this.orderProductRepository
      .createQueryBuilder('order_product')
      .select('order_product.order_id, COUNT(*) as total')
      .where('order_product.order_id IN (:...ids)', { ids: orderId })
      .groupBy('order_product.order_id')
      .getRawMany();
  }
}
