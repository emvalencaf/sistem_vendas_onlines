// decorators
import { Module } from '@nestjs/common';

// modules
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';

// controllers
import { AuthController } from './auth.controller';

// services
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: String(process.env.JWT_SECRET),
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
