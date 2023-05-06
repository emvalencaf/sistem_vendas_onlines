import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payment-status')
export class PaymentStatusEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
