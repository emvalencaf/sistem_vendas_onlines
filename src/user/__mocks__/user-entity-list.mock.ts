import { UserType } from '../../enums/user-types.enum';
import { UserEntity } from '../entities/user.entity';

export const userEntityListMock: UserEntity[] = [
  {
    id: 1,
    name: 'joão',
    email: 'jsilva@gmail.com',
    password: '$2b$10$iwP4s3pGqn7U.BVQhXbInuF.Zh7ZU1HoAsNK9CZRA23cj0xnrjyr.',
    phone: '123456789',
    cpf: '123456789',
    typeUser: UserType.User,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'joaquim',
    email: 'jsilveira@gmail.com',
    password: '123456',
    phone: '123456789',
    cpf: '123456789',
    typeUser: UserType.User,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
