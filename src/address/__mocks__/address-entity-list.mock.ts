import { AddressEntity } from '../entity/address.entity';

export const addressEntityListMock: AddressEntity[] = [
  {
    id: 1,
    cityId: 1,
    complement: 'mock complement',
    cep: '323434',
    numberAddress: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 1,
  },
  {
    id: 2,
    cityId: 1,
    complement: 'mock complement 2',
    cep: '2323224',
    numberAddress: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 1,
  },
  {
    id: 3,
    cityId: 1,
    complement: 'mocked complement 3',
    cep: '232424234',
    numberAddress: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 1,
  },
  {
    id: 4,
    cityId: 1,
    complement: 'mocked coomplement 4',
    cep: '232432324',
    numberAddress: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 3,
  },
];
