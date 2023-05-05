import { Test, TestingModule } from '@nestjs/testing';
import { StateController } from '../state.controller';
import { stateServiceMock } from '../__mocks__/state-service.mock';
import { StateEntity } from '../entity/state.entity';
import { stateEntityListMock } from '../__mocks__/state-entity-list.mock';

describe('StateController', () => {
  // controller
  let controller: StateController;

  beforeEach(async () => {
    // get mock module
    const module: TestingModule = await Test.createTestingModule({
      providers: [stateServiceMock],
      controllers: [StateController],
    }).compile();

    controller = module.get<StateController>(StateController);
  });

  describe('Module', () => {
    it('should defined state controller', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('Read', () => {
    describe('getAll method', () => {
      it('should returned all states', async () => {
        const states: StateEntity[] = await controller.getAll();

        expect(states).toEqual(stateEntityListMock);
      });
    });
  });
});
