import { UserEntity } from '../../user/entities/user.entity';

export class SignInPayloadDTO {
  id: number;
  typeUser: number;

  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.typeUser = userEntity.typeUser;
  }
}
