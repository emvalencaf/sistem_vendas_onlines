import { IsNumber } from 'class-validator';

export class UpdateInCartDTO {
  @IsNumber()
  productId: number;

  @IsNumber()
  amount: number;
}
