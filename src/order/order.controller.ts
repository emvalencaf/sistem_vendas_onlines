import {
  Body,
  Controller,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { OrderService } from './order.service';
import { OrderEntity } from './entities/order.entity';
import { UserId } from '../decorators/user-id.decorator';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // create an order
  @Post('/cart/:cartId')
  @UsePipes(ValidationPipe)
  async create(
    @Body() { amountPayment, code, datePayment, addressId }: CreateOrderDTO,
    @Param('cartId') cartId: number,
    @UserId() userId: number,
  ): Promise<OrderEntity> {
    return this.orderService.create(
      {
        amountPayment,
        code,
        datePayment,
        addressId,
      },
      cartId,
      userId,
    );
  }
}
