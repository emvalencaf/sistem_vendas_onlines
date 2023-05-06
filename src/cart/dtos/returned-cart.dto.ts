import { ReturnedCartProductDTO } from '../../cart-product/dtos/returned-cart-product.dto';
import { CartEntity } from '../entities/cart.entity';

export class ReturnedCartDTO {
  id: number;
  cartProducts?: ReturnedCartProductDTO[];

  constructor(cart: CartEntity) {
    this.id = cart.id;
    this.cartProducts = cart.cartProducts
      ? cart.cartProducts.map(
          (cartProduct) => new ReturnedCartProductDTO(cartProduct),
        )
      : undefined;
  }
}
