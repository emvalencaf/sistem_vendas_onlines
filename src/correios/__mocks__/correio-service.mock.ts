import { CorreioService } from '../correio.service';
import { responseFreightCorreiosDTO } from './response-freight-correio-dto.mock';
import { returnedCepInternalDTOMock } from './returned-cep-internal-dto.mock';

export const correioServiceMock = {
  provide: CorreioService,
  useValue: {
    getFreightPrice: jest.fn().mockResolvedValue(responseFreightCorreiosDTO),
    getByCEP: jest.fn().mockResolvedValue(returnedCepInternalDTOMock),
  },
};
