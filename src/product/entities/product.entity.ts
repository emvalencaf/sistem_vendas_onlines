import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryEntity } from '../../category/entity/category.entity';
import { CartProductEntity } from '../../cart-product/entities/cart-product.entity';
import { OrderProductEntity } from '../../order-product/entities/order-product.entity';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'category_id', nullable: false })
  categoryId: number;

  @Column({ name: 'price', type: 'decimal', nullable: false })
  price: number;

  @Column({ name: 'image', nullable: false })
  image: string;

  @Column({ name: 'weight', nullable: false })
  weight: number;

  @Column({ name: 'height', nullable: false })
  height: number;

  @Column({ name: 'length', nullable: false })
  length: number;

  @Column({ name: 'width', nullable: false })
  width: number;

  @Column({ name: 'diameter', nullable: false })
  diameter: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(
    () => CartProductEntity,
    (cartProductEntity: CartProductEntity) => cartProductEntity.product,
  )
  cartProducts?: CartProductEntity[];

  @ManyToOne(
    () => CategoryEntity,
    (category: CategoryEntity) => category.products,
  )
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category?: CategoryEntity;

  @OneToMany(
    () => OrderProductEntity,
    (orderProduct: OrderProductEntity) => orderProduct.product,
  )
  orderProducts?: OrderProductEntity[];
}
