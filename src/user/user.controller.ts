// decorators
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

// dtos
import { CreateUserDTO } from './dtos/create-user.dto';
import { ReturnedUserDTO } from './dtos/returned-user.dto';

// services
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';

// controller
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // create a new user
  @UsePipes(ValidationPipe)
  @Post()
  async create(
    @Body() { name, password, phone, email, cpf }: CreateUserDTO,
  ): Promise<UserEntity> {
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
  async getAllUsers(): Promise<ReturnedUserDTO[]> {
    return (await this.userService.getAll()).map(
      (userEntity) => new ReturnedUserDTO(userEntity),
    );
  }
  @Get('/:userId')
  async getById(@Param('userId') userId: number): Promise<UserEntity> {
    return this.userService.getByIdWithRelations(userId);
  }
}
