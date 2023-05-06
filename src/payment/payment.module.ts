import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { PaymentPixEntity } from './entities/payment-pix.entity';
import { PaymentCreditCardEntity } from './entities/payment-credit-card.entity';

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
