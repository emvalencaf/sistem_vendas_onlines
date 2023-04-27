// decorators
import { Module } from '@nestjs/common';

// controllers
import { UserController } from './user.controller';

// services
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class UserModule {}
