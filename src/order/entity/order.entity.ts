import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
}
