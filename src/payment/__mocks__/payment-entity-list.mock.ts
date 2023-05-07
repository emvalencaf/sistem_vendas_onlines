import { paymentStatusEntityListMock } from '../../payment-status/__mocks__/payment-status-entity-list.mock';
import { PaymentEntity } from '../entities/payment.entity';

export const paymentEntityListMock: PaymentEntity[] = [
  {
    id: 1,
    type: 'credit_card',
    statusId: paymentStatusEntityListMock[0].id,
    price: 10,
    discount: 5,
    finalPrice: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
