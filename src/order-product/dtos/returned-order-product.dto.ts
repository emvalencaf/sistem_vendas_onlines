import { IsNumber } from 'class-validator';
import { OrderProductEntity } from '../entities/order-product.entity';
import { ReturnedOrderDTO } from '../../order/dtos/returned-order.dto';
import { ReturnedProductDTO } from '../../product/dtos/returned-product.dto';

export class ReturnedOrderProductDTO {
  @IsNumber()
  id: number;
  @IsNumber()
  orderId: number;
  @IsNumber()
  productId: number;
  @IsNumber()
  amount: number;

  order?: ReturnedOrderDTO;
  product?: ReturnedProductDTO;

  constructor({
    id,
    orderId,
    productId,
    amount,
    order,
    product,
  }: OrderProductEntity) {
    this.id = id;
    this.orderId = orderId;
    this.productId = productId;
    this.amount = amount;
    this.order = order ? new ReturnedOrderDTO(order) : undefined;
    this.product = product ? new ReturnedProductDTO(product) : undefined;
  }
}
