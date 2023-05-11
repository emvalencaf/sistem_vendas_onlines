import { IsNumber, IsString } from 'class-validator';
import { PaymentEntity } from '../entities/payment.entity';
import { ReturnedPaymentStatusDTO } from '../../payment-status/dtos/returned-payment-status.dto';

export class ReturnedPaymentDTO {
  @IsNumber()
  id: number;
  @IsNumber()
  statusId: number;
  @IsNumber()
  price: number;
  @IsNumber()
  discount: number;
  @IsNumber()
  finalPrice: number;
  @IsString()
  type: string;
  status?: ReturnedPaymentStatusDTO;
  constructor({
    id,
    statusId,
    price,
    discount,
    finalPrice,
    type,
    status,
  }: PaymentEntity) {
    this.id = id;
    this.statusId = statusId;
    this.price = price;
    this.discount = discount;
    this.finalPrice = finalPrice;
    this.type = type;
    this.status = status ? new ReturnedPaymentStatusDTO(status) : undefined;
  }
}
