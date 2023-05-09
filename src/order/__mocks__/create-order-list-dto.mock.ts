import { addressEntityListMock } from '../../address/__mocks__/address-entity-list.mock';
import { CreateOrderDTO } from '../dtos/create-order.dto';

export const createOrderListDTOMock: CreateOrderDTO[] = [
  // payment with credit card
  {
    addressId: addressEntityListMock[0].id,
    amountPayment: 8,
  },
  // payment with pix
  {
    addressId: addressEntityListMock[0].id,
    code: 'pixcode',
    datePayment: '20/05/2023',
  },
];
