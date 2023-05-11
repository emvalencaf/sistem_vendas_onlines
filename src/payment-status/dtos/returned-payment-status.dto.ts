import { IsNumber, IsString } from 'class-validator';
import { PaymentStatusEntity } from '../entities/payment-status.entity';

export class ReturnedPaymentStatusDTO {
  @IsNumber()
  id: number;
  @IsString()
  name: string;
  constructor({ id, name }: PaymentStatusEntity) {
    this.id = id;
    this.name = name;
  }
}
