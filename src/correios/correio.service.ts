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
import { CdFormatEnum } from '../enums/correios/cd-format.ennum';
import { SizeProductDTO } from './dtos/size-product.dto';

@Injectable()
export class CorreioService {
  URL_CORREIOS = process.env.URL_CEP_CORREIOS;
  CEP_COMPANY = process.env.CEP_COMPANY;
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
  async getFreightPrice(
    cdServico: string,
    cep: string,
    { width, length, height, diameter, productValue }: SizeProductDTO,
  ): Promise<any> {
    return new Promise((resolve, _) => {
      this.soapClient.CalcPrecoPrazo(
        {
          sCepOrigem: this.CEP_COMPANY, // zip-code where the product is
          sCepDestino: cep, // zip-code for delivery
          nVlPeso: 2, // weight in kg
          nCdFormato: CdFormatEnum.BOX, // type of packaging
          nCdServico: cdServico, // type of mailing service, ex: SEDEX, PAC
          nVlComprimento: length, // length in cm
          nVlAltura: height, // height in cm
          nVlLargura: width, // width in cm
          nVlDiametro: diameter, // diameter in cm
          nCdEmpresa: '', // register code of company
          sDsSenha: '',
          sCdMaoPropria: 'N', // delivered in hands
          nVlValorDeclarado: productValue < 25 ? 0 : productValue, // product value
          sCdAvisoRecebimento: 'N', //
        },
        (_, res: ResponseFreightCorreiosDTO) => {
          if (!res) throw new BadRequestException('Error on SOAP');
          resolve(res);
        },
      );
    });
  }
}
