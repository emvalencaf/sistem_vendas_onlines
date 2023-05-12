import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import {
	BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ReturnedCepExternalDTO } from './dtos/returned-cep-external.dto';
import { CityService } from '../city/city.service';
import { CityEntity } from '../city/entities/city.entity';
import { ReturnedCepInternalDTO } from './dtos/returned-cep-internal.dto';
import { Client } from 'nestjs-soap';
import { ResponseFreightCorreiosDTO } from './dtos/response-freight-correios.dto';

@Injectable()
export class CorreioService {
  URL_CORREIOS = process.env.URL_CEP_CORREIOS;
  constructor(
    @Inject('SOAP_CORREIOS') private readonly soapClient: Client,
    private readonly httpService: HttpService,
    private readonly cityService: CityService,
  ) {}

  // get a full address by cep
  async getByCEP(cep: string): Promise<ReturnedCepInternalDTO> {
    // getting data from Correio's API
    const returnedCep: ReturnedCepExternalDTO = await this.httpService.axiosRef
      .get<ReturnedCepExternalDTO>(this.URL_CORREIOS.replace('{CEP}', cep))
      .then((result) => {
        if (!result || !result?.data || result?.data?.erro === 'true')
          throw new NotFoundException('CEP not found');

        return result.data;
      })
      .catch((err: AxiosError) => {
        console.log(err);
        throw new InternalServerErrorException('error on server');
      });

    // getting data from database about city
    const city: CityEntity | undefined = await this.cityService
      .FindCityByName(returnedCep.localidade, returnedCep.uf)
      .catch(() => undefined);

    // if no city was found it, will not returned the data of city
    return new ReturnedCepInternalDTO(returnedCep, city?.id, city?.stateId);
  }

  // get price delivery
  async getFreight(): Promise<any> {
    return new Promise((resolve, _) => {
      this.soapClient.CalcPrecoPrazo(
        {},
        (_, res: ResponseFreightCorreiosDTO) => {
          if (!res) throw new BadRequestException('Error on SOAP');
          resolve(res);
        },
      );
    });
  }
}
