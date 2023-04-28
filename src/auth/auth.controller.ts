// decorators
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

// services
import { AuthService } from './auth.service';

// dtos
import { SignInDTO } from './dtos/sign-in.dto';

// entities
import { UserEntity } from '../user/entity/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // sign in an user
  @UsePipes(ValidationPipe)
  @Post()
  async signIn(@Body() { email, password }: SignInDTO): Promise<UserEntity> {
    return await this.authService.signIn({ email, password });
  }
}
