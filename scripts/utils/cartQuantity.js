import {cart} from "../data/cart-class.js";

export function updateCartQuantity() {
  const cartQuantity = cart.calculateCartQuantity();
  document.querySelector('.js-cart-quantity')
    .innerHTML = `${cartQuantity}`;
}