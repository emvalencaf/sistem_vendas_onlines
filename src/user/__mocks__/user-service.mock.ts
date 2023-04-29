import { UserService } from '../user.service';

export const userServiceMock = {
  provide: UserService,
  useValue: {
    findOne: jest.fn(),
  },
};
