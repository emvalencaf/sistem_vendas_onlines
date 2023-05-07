import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderEntity } from '../../order/entities/order.entity';
import { ProductController } from '../../product/product.controller';
import { ProductEntity } from '../../product/entities/product.entity';

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

  @ManyToMany(() => OrderEntity, (order: OrderEntity) => order.orderProducts)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  order?: OrderEntity;

  @ManyToMany(
    () => ProductEntity,
    (product: ProductEntity) => product.orderProducts,
  )
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product?: ProductEntity;
}
