import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { AddressEntity } from '../../address/entities/address.entity';
import { PaymentEntity } from '../../payment/entities/payment.entity';
import { OrderProductEntity } from '../../order-product/entities/order-product.entity';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;
  @Column({ name: 'user_id', nullable: false })
  user_id: number;
  @Column({ name: 'payment_id', nullable: false })
  payment_id: number;
  @Column({ name: 'address_id', nullable: false })
  address_id: number;
  @Column({ name: 'date', nullable: false })
  date: Date;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToMany(() => UserEntity, (user: UserEntity) => user.orders)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: UserEntity;

  @ManyToMany(() => AddressEntity, (address: AddressEntity) => address.orders)
  @JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
  address?: AddressEntity;

  @ManyToMany(() => PaymentEntity, (payment: PaymentEntity) => payment.orders)
  @JoinColumn({ name: 'payment_id', referencedColumnName: 'id' })
  payment?: PaymentEntity;

  @OneToMany(
    () => OrderProductEntity,
    (orderProduct: OrderProductEntity) => orderProduct.order,
  )
  orderProducts?: OrderProductEntity[];
}
