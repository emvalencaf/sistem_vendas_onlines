import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDTO {
  @IsNumber()
  addressId: number;

  @IsNumber()
  @IsOptional()
  amountPayment?: number;

  @IsString()
  @IsOptional()
  code?: string;

  @IsString()
  @IsOptional()
  datePayment?: string;
}
