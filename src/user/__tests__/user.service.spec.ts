// testing tools
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';

// services
import { UserService } from '../user.service';

// entities
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';

// mocks
import { userRepositoryMock } from '../__mocks__/user-repository.mock';
import { userEntityListMock } from '../__mocks__/user-entity-list.mock';
import { createUserMock } from '../__mocks__/user-create-dto.mock';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    // mocking UserModule
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userRepositoryMock],
    }).compile();

    // getting from UserModuleMock the UserService
    service = module.get<UserService>(UserService);

    // getting from UserModuleMock the UserRepository
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should service and repository be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('Read', () => {
    it('should find all users (method getAll)', async () => {
      const users = await service.getAll();
      expect(users).toEqual(userEntityListMock);
    });

    it('should find an user by email (method getByEmail)', async () => {
      const user = await service.getByEmail(userEntityListMock[0].email);

      expect(user).toEqual(userEntityListMock[0]);
    });

    it('should return an error in method getByEmail', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(undefined);

      expect(
        service.getByEmail(userEntityListMock[0].email),
      ).rejects.toThrowError();
    });

    it('should return an error in method getByEmail (DB Error)', async () => {
      jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());

      expect(
        service.getByEmail(userEntityListMock[0].email),
      ).rejects.toThrowError();
    });

    it('should find an user by id (method getById)', async () => {
      const user = await service.getById(userEntityListMock[0].id);

      expect(user).toEqual(userEntityListMock[0]);
    });

    it('should return an error in method getById', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(undefined);

      expect(service.getById(userEntityListMock[0].id)).rejects.toThrowError();
    });

    it('should return an error in method getById (DB Error)', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(undefined);
      expect(service.getById(1)).rejects.toThrowError();
    });

    it('should find an user with relations by id (metod getByIdWithRelations)', async () => {
      const user = await service.getByIdWithRelations(userEntityListMock[0].id);

      expect(user).toEqual(userEntityListMock[0]);
    });

    it('should find if user exists by an id (exist method)', async () => {
      jest.spyOn(userRepository, 'exist').mockResolvedValueOnce(true);
      expect(await service.exist(userEntityListMock[0].id)).toEqual(true);
    });
  });

  describe('Create', () => {
    it('should created an user (create method)', async () => {
      jest.spyOn(userRepository, 'exist').mockResolvedValueOnce(false);
      const user = await service.create(createUserMock);

      expect(user).toEqual(userEntityListMock[0]);
    });

    it('should returned an error if user already exists (create method)', async () => {
      expect(service.create(createUserMock)).rejects.toThrowError();
    });
  });
});
