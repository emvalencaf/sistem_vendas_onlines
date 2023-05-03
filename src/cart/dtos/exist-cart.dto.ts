import { IsBoolean, IsNumber, IsOptional, isNumber } from 'class-validator';

export class ExistCartDTO {
  @IsNumber()
  @IsOptional()
  cartId?: number;
  @IsNumber()
  @IsOptional()
  userId?: number;
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
