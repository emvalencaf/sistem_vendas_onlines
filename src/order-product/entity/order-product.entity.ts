import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('order_product')
export class OrderProductEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;
  @Column({ name: 'order_id', nullable: false })
  order_id: number;
  @Column({ name: 'product_id', nullable: false })
  product_id: number;
  @Column({ name: 'amount', nullable: false })
  amount: number;
  @Column({ name: 'price', nullable: false })
  price: number;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
