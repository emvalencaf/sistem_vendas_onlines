// decorators
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// entities
import { AddressEntity } from './entities/address.entity';

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

  // read all addresses from an user
  async getAllFromUser(userId: number): Promise<AddressEntity[]> {
    const addresses: AddressEntity[] | undefined = await this.addressRepository
      .find({
        where: {
          userId,
        },
        relations: {
          city: {
            state: true,
          },
        },
      })
      .catch(() => undefined);

    if (!addresses) throw new NotFoundException('no address found in database');

    return addresses;
  }

  // exists address for validations
  async exist(addressId: number): Promise<boolean> {
    const result: boolean = await this.addressRepository.exist({
      where: {
        id: addressId,
      },
    });

    if (!result) throw new NotFoundException('address doesnt exists');

    return result;
  }
}
