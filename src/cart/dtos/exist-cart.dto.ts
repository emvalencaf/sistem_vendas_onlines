import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

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
