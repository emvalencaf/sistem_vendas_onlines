import { AddressEntity } from '../entity/address.entity';

export class ReturnedAddressDTO {
  complement: string;
  numberAddress: number;
  cep: string;
  city?: any;

  constructor(address: AddressEntity) {
    this.complement = address.complement;
    this.numberAddress = address.numberAddress;
    this.cep = address.cep;
  }
}
