// decorators
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// services
import { AuthService } from '../auth/auth.service';

// dtos
import { UpdateUserPasswordDTO } from './dtos/update-user-password.dto';
import { CreateUserDTO } from './dtos/create-user.dto';

// entities
import { UserEntity } from './entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';

// enums
import { UserType } from '../enums/user-types.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  // create a new user
  async create({
    name,
    password,
    phone,
    email,
    cpf,
  }: CreateUserDTO): Promise<UserEntity> {
    // check if there is an user with same email
    // const user = await this.getByEmail(email).catch(() => undefined);

    if (
      await this.userRepository.exist({
        where: {
          email,
        },
      })
    )
      throw new BadRequestException('email already registered in system');

    // turn password into an hash
    const passwordHash = await this.authService.createHashedPassword(password);

    // create user data
    const data = {
      name,
      typeUser: UserType.User,
      password: passwordHash,
      cpf,
      phone,
      email,
    };

    // create and return an new user
    return await this.userRepository.save(data);
  }

  // get all users
  async getAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  // change user's password
  async updatePassword(
    { newPassword, lastPassword }: UpdateUserPasswordDTO,
    userId: number,
  ): Promise<boolean> {
    // get user data from id
    const user = await this.getById(userId);

    // check if last password match password in database
    if (!(await this.authService.validatePassword(lastPassword, user.password)))
      throw new BadRequestException('invalid password');

    // create a hash password for new password
    const newHashedPassword = await this.authService.createHashedPassword(
      newPassword,
    );

    // updated user in database
    const result: UpdateResult | undefined = await this.userRepository
      .update(
        {
          id: userId,
        },
        {
          password: newHashedPassword,
        },
      )
      .then((result) => result)
      .catch((err) => {
        console.log(err);
        return undefined;
      });

    if (!result || result?.affected === 0)
      throw new InternalServerErrorException('error on database');

    return !!result;
  }

  // get user by it's id with relations
  async getByIdWithRelations(userId: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        addresses: {
          city: {
            state: true,
          },
        },
      },
    });
  }

  // get user by it's id
  async getById(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException(`user not found it`);
    }

    return user;
  }

  // get by email
  async getByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) throw new NotFoundException('user not found it');

    return user;
  }

  // check if exists user and return an true if exist or throw a not found exceptions if not
  async exist(id: number): Promise<boolean | void> {
    if (
      !(await this.userRepository.exist({
        where: {
          id,
        },
      }))
    )
      throw new NotFoundException('user doesnt exists');

    return true;
  }
}
