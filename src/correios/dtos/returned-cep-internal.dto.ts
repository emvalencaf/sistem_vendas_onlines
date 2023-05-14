import { IsString } from 'class-validator';
import { ReturnedCepExternalDTO } from './returned-cep-external.dto';

export class ReturnedCepInternalDTO {
  @IsString()
  cep: string;
  @IsString()
  publicPlace: string;
  @IsString()
  complement: string;
  @IsString()
  neighborhood: string;
  @IsString()
  uf: string;
  @IsString()
  city: string;
  @IsString()
  ddd: string;

  cityId?: number;
  stateId?: number;

  constructor(
    {
      cep,
      logradouro,
      complemento,
      bairro,
      localidade,
      uf,
      ddd,
    }: ReturnedCepExternalDTO,
    cityId?: number,
    stateId?: number,
  ) {
    this.cep = cep;
    this.publicPlace = logradouro;
    this.complement = complemento;
    this.city = localidade;
    this.neighborhood = bairro;
    this.uf = uf;
    this.ddd = ddd;
    this.cityId = cityId ? cityId : undefined;
    this.stateId = stateId ? stateId : undefined;
  }
}
