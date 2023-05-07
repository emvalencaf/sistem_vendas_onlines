import { getRepositoryToken } from '@nestjs/typeorm';
import { PaymentEntity } from '../entities/payment.entity';
import { paymentEntityListMock } from './payment-entity-list.mock';
import { createOrderListDTOMock } from '../../order/__mocks__/create-order-list-dto.mock';

export const paymentRepositoryMock = {
  provide: getRepositoryToken(PaymentEntity),
  useValue: {
    // will save a credit card payment by default
    save: jest.fn().mockResolvedValue({
      ...paymentEntityListMock[0],
      ...createOrderListDTOMock[0],
    }),
  },
};
