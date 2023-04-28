// decorators
import { Module } from '@nestjs/common';

// controllers
import { AddressController } from './address.controller';

// services
import { AddressService } from './address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from './entity/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity])],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [],
})
export class AddressModule {}
