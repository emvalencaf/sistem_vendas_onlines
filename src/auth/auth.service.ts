// decorators
import { BadRequestException, Injectable } from '@nestjs/common';

// services
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

// entities
import { UserEntity } from '../user/entity/user.entity';

// dtos
import { SignInDTO } from './dtos/sign-in.dto';
import { ReturnedSignInDTO } from './dtos/returned-sign-in.dto';
import { SignInPayloadDTO } from './dtos/sign-in-payload.dto';

// utils
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private issuer = 'login';
  private audience = 'users';
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // create an access token
  createToken(user: SignInPayloadDTO): string {
    try {
      const accessToken = this.jwtService.sign(
        {
          id: user.id,
          userType: user.typeUser,
        },
        {
          expiresIn: '7 days',
          subject: String(user.id),
          issuer: this.issuer,
          audience: this.audience,
        },
      );
      return accessToken;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  // sign in an user
  async signIn({ email, password }: SignInDTO): Promise<ReturnedSignInDTO> {
    // get user data by it's email
    const user: UserEntity = await this.userService
      .getByEmail(email)
      .catch(() => undefined);

    // create a flag for the match of hash password with password
    const isMatch = await bcrypt.compare(user.password, password);

    if (!user || !isMatch)
      throw new BadRequestException('email or password invalid');

    // create the returned object with token and user data
    const returnedSignIn: ReturnedSignInDTO = {
      accessToken: this.createToken(new SignInPayloadDTO(user)),
      user,
    };
    return returnedSignIn;
  }
}
