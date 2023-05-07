import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { CreateOrderDTO } from '../order/dtos/create-order.dto';
import { PaymentCreditCardEntity } from './entities/payment-credit-card.entity';
import { PaymentType } from '../enums/payment-status.enum';
import { PaymentPixEntity } from './entities/payment-pix.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
  ) {}

  // create a payment
  async create({
    code,
    datePayment,
    amountPayment,
  }: Pick<
    CreateOrderDTO,
    'code' | 'datePayment' | 'amountPayment'
  >): Promise<PaymentEntity> {
    // check if payment will be made by credit card or pix, if by none will throw an exception
    if (amountPayment) {
      // create a payment with credit card
      const paymentCreditCard = new PaymentCreditCardEntity({
        statusId: PaymentType.Done,
        price: 0,
        discount: 0,
        finalPrice: 0,
        amountPayment,
      });

      return this.paymentRepository.save(paymentCreditCard).catch((err) => {
        console.log(err);
        throw new InternalServerErrorException('error on database');
      });
    } else if (code && datePayment) {
      // create a payment with pix
      const paymentPix = new PaymentPixEntity({
        statusId: PaymentType.Done,
        price: 0,
        discount: 0,
        finalPrice: 0,
        code,
        datePayment,
      });

      return this.paymentRepository.save(paymentPix).catch((err) => {
        console.log(err);
        throw new InternalServerErrorException('error on database');
      });
    } else {
      throw new BadRequestException(
        'Amount payment or code pix and date payment not found',
      );
    }
  }
}
