import { IsNumber, IsString } from 'class-validator';

export class ReturnedGroupOrderDTO {
  @IsNumber()
  order_id: number;
  @IsString()
  total: string;
}
