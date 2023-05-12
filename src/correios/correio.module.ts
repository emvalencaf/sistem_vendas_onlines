import { Module } from '@nestjs/common';
import { CorreioService } from './correio.service';
import { HttpModule } from '@nestjs/axios';
import { CityModule } from '../city/city.module';
import { SoapModule } from 'nestjs-soap';

@Module({
  imports: [
    SoapModule.register({
      clientName: 'SOAP_CORREIOS',
      uri: 'http://ws.coreios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl',
    }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    CityModule,
  ],
  controllers: [],
  providers: [CorreioService],
  exports: [],
})
export class CorreioModule {}
