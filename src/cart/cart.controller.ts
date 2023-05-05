// decorators
import {
  Body,
  Controller,
  Get,
  Delete,
  Post,
  UsePipes,
  ValidationPipe,
  Param,
  Patch,
} from '@nestjs/common';
import { UserType } from '../enums/user-types.enum';
import { Roles } from '../decorators/roles.decorator';
import { UserId } from '../decorators/user-id.decorator';
import { DeleteResult } from 'typeorm';

// services
import { CartService } from './cart.service';

// dtos
import { InsertInCartDTO } from './dtos/insert-in-cart.dto';
import { ReturnedCartDTO } from './dtos/returned-cart.dto';
import { UpdateInCartDTO } from './dtos/update-in-cart.dto';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // get an active cart related to a user id
  @Roles(UserType.Admin, UserType.User)
  @Get()
  async getByUserId(@UserId() userId: number): Promise<ReturnedCartDTO> {
    return new ReturnedCartDTO(
      await this.cartService.getByUserId(userId, true),
    );
  }

  // insert a new cart product (or increase the amount of) on a active cart
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

  // update a cart product (the amount of product in a cart)
  @Roles(UserType.Admin, UserType.User)
  @Patch()
  async updateProductIn(
    @Body() { productId, amount }: UpdateInCartDTO,
    @UserId() userId: number,
  ): Promise<ReturnedCartDTO> {
    return new ReturnedCartDTO(
      await this.cartService.updateProductIn(
        {
          productId,
          amount,
        },
        userId,
      ),
    );
  }

  // clear up cart
  @Roles(UserType.Admin, UserType.User)
  @Delete()
  async clear(@UserId() userId: number): Promise<DeleteResult> {
    return this.cartService.clear(userId);
  }

  // delete a product in a cart
  @Roles(UserType.Admin, UserType.User)
  @Delete('/product/:productId')
  async deleteProductIn(
    @Param('productId') productId: number,
    @UserId() userId: number,
  ): Promise<DeleteResult> {
    return this.cartService.deleteProductIn(productId, userId);
  }
}
