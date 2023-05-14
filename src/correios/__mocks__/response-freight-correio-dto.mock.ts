import { CdServiceEnum } from '../../enums/correios/cd-service.enum';
import { productEntityListMock } from '../../product/__mocks__/product-entity-list.mock';
import { ResponseFreightCorreiosDTO } from '../dtos/response-freight-correios.dto';

export const responseFreightCorreiosDTO: ResponseFreightCorreiosDTO = {
  CalcPrecoPrazoResult: {
    Servicos: {
      cServico: [
        {
          Codigo: Number(CdServiceEnum.SEDEX),
          Valor: '45.3',
          PrazoEntrega: '1',
          ValorMaoPropria: '1',
          ValorAvisoRecebimento: 'N',
          ValorValorDeclarado: productEntityListMock[0].price.toString(),
          EntregaDomiciliar: 'S',
          EntregaSabado: 'S',
          Erro: '',
          MsgErro: '',
          ValorSemAdicionais: '',
          obsFim: '',
        },
      ],
    },
  },
};
