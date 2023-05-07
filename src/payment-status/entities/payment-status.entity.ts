import {
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PaymentEntity } from '../../payment/entities/payment.entity';

@Entity('payment-status')
export class PaymentStatusEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => PaymentEntity, (payment: PaymentEntity) => payment.status)
  payments?: PaymentEntity[];
}
