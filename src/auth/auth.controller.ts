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
import { ReturnedSignInDTO } from './dtos/returned-sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // sign in an user
  @UsePipes(ValidationPipe)
  @Post('/sign-in')
  async signIn(
    @Body() { email, password }: SignInDTO,
  ): Promise<ReturnedSignInDTO> {
    return await this.authService.signIn({ email, password });
  }
}
