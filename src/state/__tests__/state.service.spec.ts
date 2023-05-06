import { Repository } from 'typeorm';
import { StateService } from '../state.service';
import { StateEntity } from '../entities/state.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { stateRepositoryMock } from '../__mocks__/state-repository.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { stateEntityListMock } from '../__mocks__/state-entity-list.mock';

describe('StateService', () => {
  let service: StateService;
  let repository: Repository<StateEntity>;

  beforeEach(async () => {
    // getting state module
    const module: TestingModule = await Test.createTestingModule({
      providers: [StateService, stateRepositoryMock],
    }).compile();

    // getting state service
    service = module.get<StateService>(StateService);

    // getting state repository
    repository = module.get<Repository<StateEntity>>(
      getRepositoryToken(StateEntity),
    );
  });

  it('should service and repository be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('Read', () => {
    it('should read state list (getAll method)', async () => {
      const states: StateEntity[] = await service.getAll();

      expect(states).toEqual(stateEntityListMock);
    });
  });
});
