import { ReturnedCartDTO } from '../../cart/dtos/returned-cart.dto';
import { ReturnedProductDTO } from '../../product/dtos/returned-product.dto';
import { CartProductEntity } from '../entity/cart-product.entity';

export class ReturnedCartProductDTO {
  id: number;
  cartId: number;
  productId: number;
  amount: number;
  product?: ReturnedProductDTO;
  cart?: ReturnedCartDTO;
  constructor(cartProduct: CartProductEntity) {
    this.id = cartProduct.id;
    this.cartId = cartProduct.cartId;
    this.productId = cartProduct.productId;
    this.amount = cartProduct.amount;
    this.product = cartProduct.product
      ? new ReturnedProductDTO(cartProduct.product)
      : undefined;
    this.cart = cartProduct.cart
      ? new ReturnedCartDTO(cartProduct.cart)
      : undefined;
  }
}
