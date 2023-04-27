// decorators
import { Module } from '@nestjs/common';

// modules
import { UserModule } from './user/user.module';

// controllers
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
