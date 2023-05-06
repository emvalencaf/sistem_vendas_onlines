import { ChildEntity, Column } from 'typeorm';
import { PaymentEntity } from './payment.entity';

@ChildEntity()
export class PaymentPixEntity extends PaymentEntity {
  @Column({ name: 'code', nullable: false })
  code: number;
  @Column({ name: 'price', nullable: false })
  date_payment: Date;
}
