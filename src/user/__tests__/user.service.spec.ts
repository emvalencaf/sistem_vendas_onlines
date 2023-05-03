// testing tools
import { Repository, UpdateResult } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';

// services
import { UserService } from '../user.service';

// entities
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';

// mocks
import { userRepositoryMock } from '../__mocks__/user-repository.mock';
import { userEntityListMock } from '../__mocks__/user-entity-list.mock';
import { createUserDTOMock } from '../__mocks__/user-create-dto.mock';
import { authServiceMock } from '../../auth/__mocks__/auth-service.mock';
import { newHashedPasswordMock } from '../__mocks__/new-hashed-password.mock';
import { updateUserPasswordDTO } from '../__mocks__/update-user-password.mock';
import { updateProductDTOMock } from '../../product/__mocks__/update-product-dto.mock';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    // mocking UserModule
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, authServiceMock, userRepositoryMock],
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
    describe('getAll method', () => {
      it('should find all users', async () => {
        const users = await service.getAll();
        expect(users).toEqual(userEntityListMock);
      });
    });

    describe('getByEmail method', () => {
      it('should find an user by email', async () => {
        const user = await service.getByEmail(userEntityListMock[0].email);

        expect(user).toEqual(userEntityListMock[0]);
      });

      it('should return an error', async () => {
        jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(undefined);

        expect(
          service.getByEmail(userEntityListMock[0].email),
        ).rejects.toThrowError();
      });

      it('should return an error (DB Error)', async () => {
        jest
          .spyOn(userRepository, 'findOne')
          .mockRejectedValueOnce(new Error());

        expect(
          service.getByEmail(userEntityListMock[0].email),
        ).rejects.toThrowError();
      });
    });

    describe('getById method', () => {
      it('should find an user by id', async () => {
        const user = await service.getById(userEntityListMock[0].id);

        expect(user).toEqual(userEntityListMock[0]);
      });

      it('should return an error', async () => {
        jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(undefined);

        expect(
          service.getById(userEntityListMock[0].id),
        ).rejects.toThrowError();
      });

      it('should return an error (DB Error)', async () => {
        jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(undefined);
        expect(service.getById(1)).rejects.toThrowError();
      });
    });

    describe('getByIdWithRelations method', () => {
      it('should find an user with relations by id (metod getByIdWithRelations)', async () => {
        const user = await service.getByIdWithRelations(
          userEntityListMock[0].id,
        );

        expect(user).toEqual(userEntityListMock[0]);
      });
    });

    describe('exist method', () => {
      it('should find if user exists by an id (exist method)', async () => {
        jest.spyOn(userRepository, 'exist').mockResolvedValueOnce(true);
        expect(await service.exist(userEntityListMock[0].id)).toEqual(true);
      });
    });
  });

  describe('Create', () => {
    it('should created an user (create method)', async () => {
      jest
        .spyOn(authServiceMock.useValue, 'createHashedPassword')
        .mockResolvedValueOnce(userEntityListMock[0].password);
      jest.spyOn(userRepository, 'exist').mockResolvedValueOnce(false);
      const user = await service.create(createUserDTOMock);

      expect(user).toEqual(userEntityListMock[0]);
    });

    it('should returned an error if user already exists (create method)', async () => {
      expect(service.create(createUserDTOMock)).rejects.toThrowError();
    });
  });

  describe('Update', () => {
    describe('updatePassword method', () => {
      it('should change password', async () => {

        const result: boolean = await service.updatePassword(
          updateUserPasswordDTO,
          userEntityListMock[0].id,
        );

        expect(result).toEqual(true);
      });

	  it('should throw an error cause user wasnt found it', async () => {
        jest
          .spyOn(userRepositoryMock.useValue, 'findOne')
          .mockRejectedValueOnce(new Error('user not found it'));
		try {
          await service.updatePassword(
            updateUserPasswordDTO,
            userEntityListMock[0].id,
          );
		} catch (err) {
          expect(err.message).toEqual('user not found it');
		}
	  });

	  it('should throw an error when lastpassword doesnt matched with password on database', async () => {
        jest
          .spyOn(authServiceMock.useValue, 'validatePassword')
          .mockResolvedValueOnce(false);
		try {
			await service.updatePassword(updateUserPasswordDTO, 1);
		} catch (err) {
			expect(err.message).toEqual('invalid password');
		}
	  });

	  it('should throw an error when occors an error on database', async () => {
        jest
          .spyOn(service, 'updatePassword')
          .mockRejectedValueOnce(new Error('error on database'));
		try {
          await service.updatePassword(
            updateUserPasswordDTO,
            userEntityListMock[0].id,
          );
		} catch (err) {
			expect(err.message).toEqual('error on database');
		}
	  });
    });
  });
});
