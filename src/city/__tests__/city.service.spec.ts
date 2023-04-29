import { Repository } from 'typeorm';
import { CityService } from '../city.service';
import { CityEntity } from '../entity/city.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { cityRepositoryMock } from '../__mocks__/city-repository.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { cacheServiceMock } from '../__mocks__/cache-service.mock';
import { cityEntityListMock } from '../__mocks__/city-entity-list.mock';

describe('CityService', () => {
  let service: CityService;
  let repository: Repository<CityEntity>;

  beforeEach(async () => {
    // getting state module
    const module: TestingModule = await Test.createTestingModule({
      providers: [CityService, cityRepositoryMock, cacheServiceMock],
    }).compile();

    // getting state service
    service = module.get<CityService>(CityService);

    // getting state repository
    repository = module.get<Repository<CityEntity>>(
      getRepositoryToken(CityEntity),
    );
  });

  it('should service and repository be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('Read', () => {
    it('should get city by an id (getById method)', async () => {
      const city = await service.getById(cityEntityListMock[0].id);

      expect(city).toEqual(cityEntityListMock[0]);
    });

    it('should return error (getById method)', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);
      expect(service.getById(cityEntityListMock[0].id)).rejects.toThrowError();
    });
    it('should get all cities by an state id (getAllByStateId method)', async () => {
      const cities = await service.getAllByStateId(
        cityEntityListMock[0].stateId,
      );
      expect(cities).toEqual(
        cityEntityListMock.filter(
          (city) => city.stateId === cityEntityListMock[0].stateId,
        ),
      );
    });
  });
});
