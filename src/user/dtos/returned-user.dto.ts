import { ReturnedAddressDTO } from '../../address/dtos/returned-address.dto';
import { UserEntity } from '../entity/user.entity';

export class ReturnedUserDTO {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  addresses?: ReturnedAddressDTO[];
  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.phone = userEntity.phone;
    this.cpf = userEntity.cpf;

    this.addresses = userEntity.addresses
      ? userEntity.addresses.map((address) => new ReturnedAddressDTO(address))
      : undefined;
  }
}
