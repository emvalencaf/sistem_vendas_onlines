import { IsInt, IsString } from 'class-validator/types/decorator/decorators';

export class CreateAddressDTO {
  @IsString()
  complement: string;

  @IsInt()
  numberAddress: string;

  @IsString()
  cep: string;

  @IsInt()
  cityId: number;
}
