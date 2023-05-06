import { UserEntity } from '../../user/entities/user.entity';

export class ReturnedSignInDTO {
  user: UserEntity;
  accessToken: string;
}
