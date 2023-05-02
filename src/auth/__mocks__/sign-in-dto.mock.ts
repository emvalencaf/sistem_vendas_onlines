import { createUserDTOMock } from '../../user/__mocks__/user-create-dto.mock';
import { SignInDTO } from '../dtos/sign-in.dto';

export const signInDTOMock: SignInDTO = {
  email: createUserDTOMock.email,
  password: createUserDTOMock.password,
};
