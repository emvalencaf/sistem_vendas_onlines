import { IsNumber } from 'class-validator';

export class CreateOrderProductDTO {
  @IsNumber()
  orderId: number;
  @IsNumber()
  productId: number;
  @IsNumber()
  amount: number;
  @IsNumber()
  price: number;
}
