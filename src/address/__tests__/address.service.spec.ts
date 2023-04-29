import { Repository } from 'typeorm';
import { AddressService } from '../address.service';
import { AddressEntity } from '../entity/address.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { addressRepositoryMock } from '../__mocks__/address-repository.mock';
import { createAddressDTOMock } from '../__mocks__/address-create-dto.mock';
import { userEntityListMock } from '../../user/__mocks__/user-entity-list.mock';
import { addressEntityListMock } from '../__mocks__/address-entity-list.mock';

describe('AddressService', () => {
  let service: AddressService;
  let repository: Repository<AddressEntity>;

  beforeEach(async () => {
    // getting address module
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressService, addressRepositoryMock],
    }).compile();

    // getting address service
    service = module.get<AddressService>(AddressService);

    // getting address repository
    repository = module.get<Repository<AddressEntity>>(
      getRepositoryToken(AddressEntity),
    );
  });
  it('should service and repository be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
  describe('Create', () => {
    it('should create an address (create method)', async () => {
      const address = await service.create(
        createAddressDTOMock,
        userEntityListMock[0].id,
      );

      expect(address).toEqual(addressEntityListMock[0]);
    });
  });
});
