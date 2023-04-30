import { createUserMock } from '../../user/__mocks__/user-create-dto.mock';
import { SignInDTO } from '../dtos/sign-in.dto';

export const signInDTOMock: SignInDTO = {
  email: createUserMock.email,
  password: createUserMock.password,
};
