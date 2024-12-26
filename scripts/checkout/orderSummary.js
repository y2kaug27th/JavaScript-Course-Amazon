import { getProduct } from "../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions, getDeliveryOption } from "../data/deliveryOption.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { calculateDeliveryDate } from "../data/deliveryOption.js";
import { cart } from "../data/cart-class.js";

export function renderOrderSummary(element) {
let orderSummaryHTML = ''

  element.cartItems.forEach((cartItem) =>{
  const productId = cartItem.productId;

  const matchingProduct = getProduct(productId)

  const deliveryOptionId = cartItem.deliveryOptionId;

  const deliveryOption = getDeliveryOption(deliveryOptionId);

  orderSummaryHTML +=`
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: ${calculateDeliveryDate(deliveryOption)}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          ${matchingProduct.getPrice()}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-link"
          data-product-id="${matchingProduct.id}">
            Update
          </span>
          <input class="quantity-input js-quantity-input-${matchingProduct.id}">
          <span class="save-quantity-link link-primary js-save-link"
          data-product-id="${matchingProduct.id}">
            Save
          </span>
          <span class="delete-quantity-link link-primary js-delete-link
           js-delete-link-${matchingProduct.id}"
          data-product-id="${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        ${deliveryOptionsHTML(matchingProduct, cartItem)}
      </div>
    </div>
  </div>
  `
})

document.querySelector(".js-order-summary").innerHTML = orderSummaryHTML;

  element.updateCartQuantity();




document.querySelectorAll(".js-delete-link")
  .forEach((link) =>{
  link.addEventListener('click', () =>{
    const productId = link.dataset.productId;
    element.removeFromCart(productId);
    renderOrderSummary(element);
    renderPaymentSummary();
  })
})

document.querySelectorAll(".js-update-link")
  .forEach((link) =>{
    link.addEventListener('click', () =>{
      const productId = link.dataset.productId;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.add('is-editing-quantity');
      element.updateCartQuantity();
  })
})

document.querySelectorAll('.js-save-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.remove('is-editing-quantity');
      
      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`)

      const newQuantity = Number(quantityInput.value);

      element.updateQuantity(productId, newQuantity);

      document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;

      element.updateCartQuantity();
      renderPaymentSummary();
  });
})

function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = '';

  deliveryOptions.forEach((deliveryOption) => {

    const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId

    html +=`
    <div class="delivery-option js-delivery-option"
      data-product-id = "${matchingProduct.id}"
      data-delivery-option-id = "${deliveryOption.id}">
          <input type="radio" 
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${calculateDeliveryDate(deliveryOption)}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
    `
  })
  return html;
}

document.querySelectorAll('.js-delivery-option').forEach((element) => {
  element.addEventListener('click', () => {
    const {productId, deliveryOptionId} = element.dataset;
    element.updateDeliveryOption(productId, deliveryOptionId);
    renderOrderSummary(element);
    renderPaymentSummary();
  })
})
}
