// dtos
import { ReturnedCityDTO } from '../../city/dtos/returned-city.dto';

// entities
import { AddressEntity } from '../entity/address.entity';

export class ReturnedAddressDTO {
  complement: string;
  numberAddress: number;
  cep: string;
  city?: ReturnedCityDTO;

  constructor(address: AddressEntity) {
    this.complement = address.complement;
    this.numberAddress = address.numberAddress;
    this.cep = address.cep;
    this.city = address.city ? new ReturnedCityDTO(address.city) : undefined;
  }
}
