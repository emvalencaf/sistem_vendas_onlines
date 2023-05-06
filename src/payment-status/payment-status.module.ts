import { Module } from '@nestjs/common';
import { PaymentStatusService } from './payment-status.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentStatusEntity } from './entities/payment-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentStatusEntity])],
  controllers: [],
  providers: [PaymentStatusService],
  exports: [],
})
export class PaymentStatusModule {}
