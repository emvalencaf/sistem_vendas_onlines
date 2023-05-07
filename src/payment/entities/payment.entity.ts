import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { OrderEntity } from '../../order/entities/order.entity';
import { PaymentStatusEntity } from '../../payment-status/entities/payment-status.entity';

@Entity('payment')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class PaymentEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;
  @Column({ name: 'status_id', nullable: false })
  status_id: number;
  @Column({ name: 'price', nullable: false })
  price: number;
  @Column({ name: 'discount', nullable: false })
  discount: number;
  @Column({ name: 'final_price', nullable: false })
  final_price: number;
  @Column({ name: 'type', nullable: false })
  type: string;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => OrderEntity, (order: OrderEntity) => order.payment)
  orders?: OrderEntity[];

  @ManyToOne(
    () => PaymentStatusEntity,
    (statusPayment: PaymentStatusEntity) => statusPayment.payments,
  )
  @JoinColumn({ name: 'status_id', referencedColumnName: 'id' })
  status?: PaymentStatusEntity;
}
