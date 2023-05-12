import { IsString } from 'class-validator';

export class ReturnedCepExternalDTO {
  @IsString()
  cep: string;
  @IsString()
  logradouro: string;
  @IsString()
  complemento: string;
  @IsString()
  bairro: string;
  @IsString()
  localidade: string;
  @IsString()
  uf: string;
  @IsString()
  ddd: string;
  @IsString()
  erro?: string;
}
