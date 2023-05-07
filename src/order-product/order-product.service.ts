import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProductEntity } from './entities/order-product.entity';
import { Repository } from 'typeorm';
import { CreateOrderProductDTO } from './dtos/create-order-product.dto';

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
}
