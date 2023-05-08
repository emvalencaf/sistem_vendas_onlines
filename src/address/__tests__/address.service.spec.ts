import { Repository } from 'typeorm';
import { AddressService } from '../address.service';
import { AddressEntity } from '../entities/address.entity';
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
  describe('Read', () => {
    describe('getAllFromUser method', () => {
      it('should read all addresses of an user (getAllFromUser method)', async () => {
        const result: AddressEntity[] = addressEntityListMock.filter(
          (address) => address.userId === userEntityListMock[0].id,
        );
        jest
          .spyOn(addressRepositoryMock.useValue, 'find')
          .mockResolvedValueOnce(result);
        const addresses = await service.getAllFromUser(
          userEntityListMock[0].id,
        );
        expect(addresses).toEqual(result);
      });
      it('should throw a not found exception', async () => {
        jest
          .spyOn(addressRepositoryMock.useValue, 'find')
          .mockResolvedValueOnce([]);
        try {
          await service.getAllFromUser(userEntityListMock[0].id);
        } catch (err) {
          expect(err.message).toEqual('no address found in database');
        }
      });
    });
    describe('exist method', () => {
      it('should return a true value if address exists', async () => {
        const result: boolean = await service.exist(
          addressEntityListMock[0].id,
        );
        expect(result).toEqual(true);
      });

      it('should thrown a not found exception if address doesnt exists', async () => {
        jest
          .spyOn(addressRepositoryMock.useValue, 'exist')
          .mockResolvedValue(false);

        try {
          await service.exist(addressEntityListMock[0].id);
        } catch (err) {
          expect(err.message).toEqual('address doesnt exists');
        }
      });
    });
  });
});
