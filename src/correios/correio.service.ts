import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class CorreioService {
  URL_CORREIOS = process.env.URL_CEP_CORREIOS;
  constructor(private readonly hattpService: HttpService) {}

  getByCEP(cep: string): Promise<AxiosResponse<any>> {
    return this.hattpService.axiosRef
      .get(URL_CORREIOS.replace('{CEP}', cep))
      .then((result) => result)
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException('error on server');
      });
  }
}
