import { ChildEntity, Column } from 'typeorm';
import { PaymentEntity } from './payment.entity';
import { PaymentDTO } from '../dtos/payment.dto';
import { CreateOrderDTO } from '../../order/dtos/create-order.dto';

@ChildEntity()
export class PaymentPixEntity extends PaymentEntity {
  @Column({ name: 'code', nullable: false })
  code: string;
  @Column({ name: 'date_payment', nullable: false })
  datePayment: Date;

  constructor({
    statusId,
    discount,
    price,
    finalPrice,
    code,
    datePayment,
  }: PaymentDTO & Pick<CreateOrderDTO, 'datePayment' | 'code'>) {
    super({ statusId, price, finalPrice, discount });
    this.code = code || '';
    this.datePayment = new Date(datePayment || '');
  }
}
