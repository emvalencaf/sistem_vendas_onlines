// decorators
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// entities
import { AddressEntity } from './entity/address.entity';

// dtos
import { CreateAddressDTO } from './dtos/create-address.dto';
import { Repository } from 'typeorm';

// service
@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
  ) {}

  // create an address
  async create(
    { complement, numberAddress, cep, cityId }: CreateAddressDTO,
    userId: number,
  ): Promise<AddressEntity> {
    return await this.addressRepository.save({
      userId,
      complement,
      numberAddress,
      cep,
      cityId,
    });
  }
}
