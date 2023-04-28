import { Module } from '@nestjs/common';
import { StateController } from './state.controller';
import { StateService } from './state.service';
import { StateEntity } from './entity/state.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StateEntity])],
  controllers: [StateController],
  providers: [StateService],
  exports: [],
})
export class StateModule {}
