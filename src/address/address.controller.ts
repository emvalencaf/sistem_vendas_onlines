// decorators
import {
  Body,
  Controller,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

// services
import { AddressService } from './address.service';

// dtos
import { CreateAddressDTO } from './dtos/create-address.dto';

// entities
import { AddressEntity } from './entity/address.entity';

// controller
@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  // create a new address
  @Post('/:userId')
  @UsePipes(ValidationPipe)
  async create(
    @Body() { complement, numberAddress, cityId, cep }: CreateAddressDTO,
    @Param('userId') userId: number,
  ): Promise<AddressEntity> {
    return this.addressService.create(
      { complement, numberAddress, cep, cityId },
      userId,
    );
  }
}
