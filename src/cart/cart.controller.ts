import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../enums/user-types.enum';
import { InsertInCartDTO } from './dtos/insert-in-cart.dto';
import { UserId } from '../decorators/user-id.decorator';
import { ReturnedCartDTO } from './dtos/returned-cart.dto';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Roles(UserType.Admin, UserType.User)
  @UsePipes(ValidationPipe)
  @Post()
  async insertProductIn(
    @Body() { productId, amount }: InsertInCartDTO,
    @UserId() userId: number,
  ): Promise<ReturnedCartDTO> {
    return new ReturnedCartDTO(
      await this.cartService.insertProductIn(
        {
          productId,
          amount,
        },
        userId,
      ),
    );
  }
}
