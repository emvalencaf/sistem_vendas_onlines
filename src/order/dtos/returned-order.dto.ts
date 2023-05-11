import { IsNumber, IsString } from 'class-validator';
import { OrderEntity } from '../entities/order.entity';
import { ReturnedUserDTO } from '../../user/dtos/returned-user.dto';
import { ReturnedAddressDTO } from '../../address/dtos/returned-address.dto';
import { ReturnedPaymentDTO } from '../../payment/dtos/returned-payment.dto';
import { ReturnedOrderProductDTO } from '../../order-product/dtos/returned-order-product.dto';

export class ReturnedOrderDTO {
  @IsNumber()
  id: number;
  @IsString()
  date: string;

  user?: ReturnedUserDTO;
  address?: ReturnedAddressDTO;
  payment?: ReturnedPaymentDTO;
  orderProducts?: ReturnedOrderProductDTO[];

  constructor({
    id,
    date,
    user,
    address,
    payment,
    orderProducts,
  }: OrderEntity) {
    this.id = id;
    this.date = date.toString();
    this.user = user ? new ReturnedUserDTO(user) : undefined;
    this.address = address ? new ReturnedAddressDTO(address) : undefined;
    this.payment = payment ? new ReturnedPaymentDTO(payment) : undefined;
    this.orderProducts = orderProducts
      ? orderProducts.map(
          (orderProduct) => new ReturnedOrderProductDTO(orderProduct),
        )
      : undefined;
  }
}
