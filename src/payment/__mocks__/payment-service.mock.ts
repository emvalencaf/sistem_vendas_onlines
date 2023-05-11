import { PaymentService } from '../payment.service';
import { paymentEntityListMock } from './payment-entity-list.mock';

export const paymentServiceMock = {
  provide: PaymentService,
  useValue: {
    // will save a credit card payment by default
    create: jest.fn().mockResolvedValue({
      ...paymentEntityListMock[0],
    }),
    calculatingTotalPrice: jest.fn().mockResolvedValue(5),
  },
};
