// decorators
import { Module } from '@nestjs/common';

// controllers
import { AddressController } from './address.controller';

// services
import { AddressService } from './address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from './entity/address.entity';
import { UserService } from '../user/user.service';
import { CityService } from '../city/city.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AddressEntity]),
    UserService,
    CityService,
  ],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [],
})
export class AddressModule {}
