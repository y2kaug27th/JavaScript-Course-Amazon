import { cart } from "../data/cart-class.js";
import { getProduct } from "../data/products.js";
import { getDeliveryOption } from "../data/deliveryOption.js";
import { formatCurrency } from "../utils/money.js";
import { order } from "../data/order.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  let paymentSummaryHTML = '';

  cart.cartItems.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    shippingPriceCents += deliveryOption.priceCents;

    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents *0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

    paymentSummaryHTML = 
    `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cart.calculateCartQuantity()}):</div>
      <div class="payment-summary-money">
        $${formatCurrency(productPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">
        $${formatCurrency(shippingPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalBeforeTaxCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
        $${formatCurrency(taxCents)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalCents)}
      </div>
    </div>

    <button class="place-order-button button-primary js-place-order-button">
      Place your order
    </button>
    `;
  });

  document.querySelector(".js-payment-summary").innerHTML =
    productPriceCents === 0 ?
    `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (0):</div>
      <div class="payment-summary-money">
        $0.00
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">
        $0.00
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
        $0.00
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
        $0.00
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
        $0.00
      </div>
    </div>
  `: paymentSummaryHTML

  try {
  document.querySelector('.js-place-order-button')
    .addEventListener('click', async () => {
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart: cart.cartItems
        })
      });

      const PurchasedProducts = await response.json();
      order.addToOrder(PurchasedProducts);

      window.location.href = './orders.html';
  })} catch (error) {
    console.log('No products in cart');
  }
}