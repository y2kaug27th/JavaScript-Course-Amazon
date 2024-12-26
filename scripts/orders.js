import {orderPlaced} from "./data/order.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {formatCurrency} from "./utils/money.js";
import {getProduct, loadProductsFetch} from "./data/products.js";
import {updateCartQuantity} from "./utils/cartQuantity.js";
import {cart} from "./data/cart-class.js";


let ordersHTML = '';

async function rendersOrderGrid() {

  await loadProductsFetch();

  orderPlaced.orders.forEach((order) => {

    const orderTimeFormat = dayjs(order.orderTime).format('MMMM D');

    const orderDetailsHTML = renderOrderDetailsGrid(order);

    ordersHTML +=
      `
      <div class="order-container">

      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${orderTimeFormat}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${formatCurrency(order.totalCostCents)}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.id}</div>
        </div>
      </div>

      <div class="order-details-grid">
        ${orderDetailsHTML}
      </div>
    </div>
      `
  })

  updateCartQuantity();

  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;
}

function renderOrderDetailsGrid(order) {

  let orderDetailsHTML = '';

  order.products.forEach((product) => {
    const productDetails = getProduct(product.productId);
    orderDetailsHTML +=
      `
      <div class="product-image-container">
        <img src="${productDetails.image}">
      </div>

      <div class="product-details">
        <div class="product-name">
          ${productDetails.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${dayjs(product.estimatedDeliveryTime).format('MMMM D')}
        </div>
        <div class="product-quantity">
          Quantity: ${product.quantity}
        </div>
        <button class="buy-again-button button-primary js-buy-again-button"
        data-product-id = "${productDetails.id}"
        data-quantity = "${product.quantity}">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">
            Buy it again
          </span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html?productId=${productDetails.id}">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
      `
  })

  return orderDetailsHTML;
}

await rendersOrderGrid();

document.querySelectorAll('.js-buy-again-button').forEach((element) => {
  element.addEventListener('click', () => {
    const productId = element.dataset.productId;
    const quantity = Number(element.dataset.quantity);
    cart.addToCart(productId, quantity);
    updateCartQuantity();
  })
})



