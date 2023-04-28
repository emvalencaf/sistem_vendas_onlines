// decorators
import { Module } from '@nestjs/common';

// controllers
import { AuthController } from './auth.controller';

// services
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [UserService],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
