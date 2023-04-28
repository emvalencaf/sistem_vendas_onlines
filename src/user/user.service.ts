// decorators
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// dtos
import { CreateUserDTO } from './dtos/create-user.dto';

// entities
import { UserEntity } from './entity/user.entity';

// utils
import { genSalt, hash } from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // create a new user
  async create({
    name,
    password,
    phone,
    email,
    cpf,
  }: CreateUserDTO): Promise<UserEntity> {
    // turn password into an hash
    const salt = await genSalt();
    const passwordHash = await hash(password, salt);

    // create user data
    const data = {
      name,
      typeUser: 1,
      password: passwordHash,
      cpf,
      phone,
      email,
    };

    // create and return an new user
    return await this.userRepository.save(data);
  }

  // get all users
  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  // get user by it's id with relations
  async getByIdWithRelAddresses(userId: number): Promise<UserEntity> {
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

    if (!user) throw new NotFoundException('user not found it');

    return user;
  }
}
