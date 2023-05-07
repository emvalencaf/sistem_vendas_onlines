import { IsNumber } from 'class-validator';

export class PaymentDTO {
  @IsNumber()
  statusId: number;
  @IsNumber()
  price: number;
  @IsNumber()
  discount: number;
  @IsNumber()
  finalPrice: number;
}
