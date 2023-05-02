// decorators
import { Module, forwardRef } from '@nestjs/common';

// modules
import { JwtModule, JwtService } from '@nestjs/jwt';
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
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
