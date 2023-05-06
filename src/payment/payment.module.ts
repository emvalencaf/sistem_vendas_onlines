import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from './entity/payment.entity';
import { PaymentPixEntity } from './entity/payment-pix.entity';
import { PaymentCreditCardEntity } from './entity/payment-credit-card.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PaymentEntity,
      PaymentPixEntity,
      PaymentCreditCardEntity,
    ]),
  ],
  controllers: [],
  providers: [PaymentService],
  exports: [],
})
export class PaymentModule {}
