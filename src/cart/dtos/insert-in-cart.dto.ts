import { IsNumber } from 'class-validator';

export class InsertInCartDTO {
  @IsNumber()
  productId: number;

  @IsNumber()
  amount: number;
}
