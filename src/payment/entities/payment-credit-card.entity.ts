import { ChildEntity, Column } from 'typeorm';
import { PaymentEntity } from './payment.entity';
import { CreateOrderDTO } from '../../order/dtos/create-order.dto';
import { PaymentDTO } from '../dtos/payment.dto';

@ChildEntity()
export class PaymentCreditCardEntity extends PaymentEntity {
  @Column({ name: 'amount_payment', nullable: false })
  amountPayment: number;

  constructor({
    statusId,
    discount,
    price,
    finalPrice,
    amountPayment,
  }: PaymentDTO & Pick<CreateOrderDTO, 'amountPayment'>) {
    super({ statusId, price, finalPrice, discount });
    this.amountPayment = amountPayment;
  }
}
