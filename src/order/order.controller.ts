// decorators
import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserId } from '../decorators/user-id.decorator';

// services
import { OrderService } from './order.service';

// dtos
import { CreateOrderDTO } from './dtos/create-order.dto';

// entities
import { OrderEntity } from './entities/order.entity';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // create an order
  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Body() { amountPayment, code, datePayment, addressId }: CreateOrderDTO,
    @UserId() userId: number,
  ): Promise<OrderEntity> {
    return this.orderService.create(
      {
        amountPayment,
        code,
        datePayment,
        addressId,
      },
      userId,
    );
  }

  // find all orders by an user id
  @Get()
  @UsePipes(ValidationPipe)
  async findByUserId(@UserId() userId: number): Promise<OrderEntity[]> {
    return this.orderService.findByUserId(userId);
  }
}
