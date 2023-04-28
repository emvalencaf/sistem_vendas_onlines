import { IsInt, IsString } from 'class-validator/types/decorator/decorators';

export class CreateAddressDTO {
  @IsString()
  complement: string;

  @IsInt()
  numberAddress: number;

  @IsString()
  cep: string;

  @IsInt()
  cityId: number;
}
