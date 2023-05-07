import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { CreateOrderDTO } from '../order/dtos/create-order.dto';
import { PaymentCreditCardEntity } from './entities/payment-credit-card.entity';
import { PaymentType } from '../enums/payment-status.enum';
import { PaymentPixEntity } from './entities/payment-pix.entity';
import { ProductEntity } from '../product/entities/product.entity';
import { CartEntity } from '../cart/entities/cart.entity';
import { CartProductEntity } from '../cart-product/entities/cart-product.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
  ) {}

  // calculating total price of all cart products realted to cart for payment
  calculatingTotalPrice(
    products: ProductEntity[],
    cartProducts: CartProductEntity[],
  ): number {
    if (!cartProducts || cartProducts.length === 0) return 0;

    return cartProducts
      .map((cartProduct) => {
        // get related product
        const product: ProductEntity = products.find(
          (product) => product.id === cartProduct.productId,
        );

        // calculating the amount of cart product and product price
        if (product) return cartProduct.amount * product.price;

        // if no product was found it, returns 0
        return 0;
      })
      .reduce((accumulater, currentValue) => accumulater + currentValue, 0);
  }

  // create a payment
  async create(
    {
      code,
      datePayment,
      amountPayment,
    }: Pick<CreateOrderDTO, 'code' | 'datePayment' | 'amountPayment'>,
    products: ProductEntity[],
    cart: CartEntity,
  ): Promise<PaymentEntity> {
    // calculating price
    const totalPrice: number = this.calculatingTotalPrice(
      products,
      cart.cartProducts,
    );

    // check if payment will be made by credit card or pix, if by none will throw an exception
    if (amountPayment) {
      // create a payment with credit card
      const paymentCreditCard = new PaymentCreditCardEntity({
        statusId: PaymentType.Done,
        price: totalPrice,
        discount: 0,
        finalPrice: totalPrice,
        amountPayment,
      });

      return this.paymentRepository.save(paymentCreditCard).catch((err) => {
        console.log(err);
        throw new InternalServerErrorException('error on database');
      });
    } else if (code && datePayment) {
      // create a payment with pix
      const paymentPix = new PaymentPixEntity({
        statusId: PaymentType.Done,
        price: 0,
        discount: 0,
        finalPrice: 0,
        code,
        datePayment,
      });

      return this.paymentRepository.save(paymentPix).catch((err) => {
        console.log(err);
        throw new InternalServerErrorException('error on database');
      });
    } else {
      throw new BadRequestException(
        'Amount payment or code pix and date payment not found',
      );
    }
  }
}
