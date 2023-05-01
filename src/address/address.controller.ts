// decorators
import {
  Body,
  Controller,
  Get,
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
import { UserId } from '../decorators/user-id.decorator';
import { ReturnedAddressDTO } from './dtos/returned-address.dto';

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
  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Body() { complement, numberAddress, cityId, cep }: CreateAddressDTO,
    @UserId('userId') userId: number,
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

  // get all addresses of an user by userId
  @Roles(UserType.Admin)
  @Get('/:userId')
  @UsePipes(ValidationPipe)
  async getAllFromUser(
    @UserId() userId: number,
  ): Promise<ReturnedAddressDTO[]> {
    return (await this.addressService.getAllFromUser(userId)).map(
      (address) => new ReturnedAddressDTO(address),
    );
  }
}
