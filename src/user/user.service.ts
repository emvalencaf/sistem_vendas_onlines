// decorators
import { Injectable } from '@nestjs/common';

// dtos
import { CreateUserDTO } from './dtos/create-user.dto';

// interfaces
import { UserI } from './interfaces/user.interface';

// utils
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UserService {
  private users: UserI[] = [];

  // create a new user
  async create({
    name,
    password,
    phone,
    email,
    cpf,
  }: CreateUserDTO): Promise<UserI> {
    // turn password into an hash
    const salt = await genSalt();
    const passwordHash = await hash(password, salt);

    // create user data
    const user = {
      name,
      password: passwordHash,
      cpf,
      phone,
      email,
      id: this.users.length + 1,
    };

    // insert new user in the memory
    this.users.push(user);

    return user;
  }

  // get all users
  async getAllUsers(): Promise<UserI[]> {
    return this.users;
  }
}
