// decorators
import { Body, Controller, Get, Post } from '@nestjs/common';

// dtos
import { CreateUserDTO } from './dtos/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // create a new user
  @Post()
  async create(@Body() { name, password, phone, email, cpf }: CreateUserDTO) {
    return this.userService.create({
      name,
      password,
      phone,
      cpf,
      email,
    });
  }
  // Get all users
  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
}
