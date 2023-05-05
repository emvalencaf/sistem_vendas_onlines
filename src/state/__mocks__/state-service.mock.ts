import { StateService } from '../state.service';
import { stateEntityListMock } from './state-entity-list.mock';

export const stateServiceMock = {
  provide: StateService,
  useValue: {
    getAll: jest.fn().mockResolvedValue(stateEntityListMock),
  },
};
