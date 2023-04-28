import { UserEntity } from '../../user/entity/user.entity';

export class ReturnedSignInDTO {
  user: UserEntity;
  accessToken: string;
}
