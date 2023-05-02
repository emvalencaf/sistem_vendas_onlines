// decorators
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  forwardRef,
  Inject,
} from '@nestjs/common';

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
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  // create an access token
  async createToken(user: SignInPayloadDTO): Promise<string> {
    try {
      const accessToken = await this.jwtService.sign(
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
      console.log(err);
      throw new BadRequestException(err);
    }
  }

  // sign in an user
  async signIn({ email, password }: SignInDTO): Promise<ReturnedSignInDTO> {
    // get user data by it's email
    const user: UserEntity | undefined = await this.userService
      .getByEmail(email)
      .catch(() => undefined);
    // create a flag for the match of hash password with password
    const isMatch = await bcrypt.compare(password, user?.password || '');
    if (!user || !isMatch)
      throw new BadRequestException('email or password invalid');

    // create the returned object with token and user data
    const returnedSignIn: ReturnedSignInDTO = {
      accessToken: await this.createToken(new SignInPayloadDTO(user)),
      user,
    };
    return returnedSignIn;
  }

  // create a hashed password
  async createHashedPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt().catch((err) => {
      console.log(err);
      throw new InternalServerErrorException('error on server');
    });
    const passwordHash = await bcrypt.hash(password, salt).catch((err) => {
      console.log(err);
      throw new InternalServerErrorException('error on server');
    });
    return passwordHash;
  }

  // validation password
  async validatePassword(
    password: string,
    hashedPassword = '',
  ): Promise<boolean> {
    return bcrypt
      .compare(password, hashedPassword)
      .then((result) => result)
      .catch((err) => {
        console.log(err);
        return false;
      });
  }
}
