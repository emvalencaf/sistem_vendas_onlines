// decorators
import {
  Body,
  Controller,
  Get,
  Param,
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
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../enums/user-types.enum';
import { ReturnedOrderDTO } from './dtos/returned-order.dto';

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

  // get all users
  @Roles(UserType.Admin)
  @Get('/all')
  @UsePipes(ValidationPipe)
  async getAll(): Promise<ReturnedOrderDTO[]> {
    return (await this.orderService.getAll(true)).map(
      (order) => new ReturnedOrderDTO(order),
    );
  }

  // get an order by id
  @Roles(UserType.Admin)
  @Get('/:orderId')
  @UsePipes(ValidationPipe)
  async getById(@Param('orderId') orderId: number): Promise<ReturnedOrderDTO> {
    return new ReturnedOrderDTO(await this.orderService.getById(orderId, true));
  }
}
