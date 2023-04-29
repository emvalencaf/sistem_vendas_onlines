// decorators
import {
  Body,
  Controller,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';

// services
import { AddressService } from './address.service';
import { UserService } from '../user/user.service';
import { CityService } from '../city/city.service';

// dtos
import { CreateAddressDTO } from './dtos/create-address.dto';

// entities
import { AddressEntity } from './entity/address.entity';

// enums
import { UserType } from '../enums/user-types.enum';

// controller
@Controller('addresses')
export class AddressController {
  constructor(
    private readonly addressService: AddressService,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) {}

  // create a new address
  @Roles(UserType.User)
  @Post('/:userId')
  @UsePipes(ValidationPipe)
  async create(
    @Body() { complement, numberAddress, cityId, cep }: CreateAddressDTO,
    @Param('userId') userId: number,
  ): Promise<AddressEntity> {
    // validate userId and cityId
    await this.userService.getById(userId);
    await this.cityService.getById(cityId);

    // if userId and cityId are valid, return and create a new address
    return this.addressService.create(
      { complement, numberAddress, cep, cityId },
      userId,
    );
  }
}
