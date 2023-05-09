import { createOrderListDTOMock } from '../../order/__mocks__/create-order-list-dto.mock';
import { paymentStatusEntityListMock } from '../../payment-status/__mocks__/payment-status-entity-list.mock';
import { PaymentCreditCardEntity } from '../entities/payment-credit-card.entity';
import { PaymentPixEntity } from '../entities/payment-pix.entity';
import { PaymentEntity } from '../entities/payment.entity';

export const paymentEntityListMock: PaymentEntity[] = [
  // credit card
  {
    id: 1,
    statusId: paymentStatusEntityListMock[0].id,
    price: 5,
    discount: 0,
    finalPrice: 5,
    amountPayment: createOrderListDTOMock[0].amountPayment,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as PaymentCreditCardEntity,
  // pix
  {
    id: 1,
    statusId: paymentStatusEntityListMock[0].id,
    price: 5,
    discount: 0,
    finalPrice: 5,
    code: createOrderListDTOMock[1].code,
    datePayment: new Date(createOrderListDTOMock[1].datePayment),
    createdAt: new Date(),
    updatedAt: new Date(),
  } as PaymentPixEntity,
];
