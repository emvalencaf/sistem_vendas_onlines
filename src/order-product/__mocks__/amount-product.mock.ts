import { ReturnedGroupOrderDTO } from '../dtos/returned-group-order.dto';
import { orderProductEntityListMock } from './order-product-repository.mock';

export const returnedGroupOrderDTOMock: ReturnedGroupOrderDTO[] =
  orderProductEntityListMock.map((orderProduct) => ({
    order_id: orderProduct.orderId,
    total: orderProduct.amount.toString(),
  }));
