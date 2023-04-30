import { JwtService } from '@nestjs/jwt';
import { accessTokenMock } from './access-token.mock';

export const jwtServiceMock = {
  provide: JwtService,
  useValue: {
    sign: jest.fn().mockResolvedValue(accessTokenMock),
  },
};
