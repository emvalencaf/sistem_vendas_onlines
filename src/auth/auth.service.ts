// decorators
import { BadRequestException, Injectable } from '@nestjs/common';

// services
import { UserService } from '../user/user.service';

// entities
import { UserEntity } from '../user/entity/user.entity';

// dtos
import { SignInDTO } from './dtos/sign-in.dto';

// utils
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  // sign in an user
  async signIn({ email, password }: SignInDTO): Promise<UserEntity> {
    // get user data by it's email
    const user: UserEntity = await this.userService
      .getByEmail(email)
      .catch(() => undefined);

    // create a flag for the match of hash password with password
    const isMatch = await bcrypt.compare(user.password, password);

    if (!user || !isMatch)
      throw new BadRequestException('email or password invalid');

    return user;
  }
}
