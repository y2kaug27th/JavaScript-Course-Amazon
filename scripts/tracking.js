import{orderPlaced} from "./data/order.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {loadProductsFetch, products} from "./data/products.js";
import {updateCartQuantity} from "./utils/cartQuantity.js";

let trackingHTML = '';
const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');

async function renderTrackingInfo() {

  await loadProductsFetch();

  let matchingOrder = '';
  if (orderId) {
    orderPlaced.orders.forEach((order) => {
      if (orderId === order.id) {
        matchingOrder = order;
      }
    });
  }

  let matchingProduct = '';
  if (matchingOrder) {
    matchingOrder.products.forEach((product) => {
      if (productId === product.productId) {
        matchingProduct = product;
      }
    });
  }

  let productInfo = '';
  if (productId) {
    products.forEach((product) => {
      if (productId === product.id) {
        productInfo = product;
      }
    });
  }

  const today = dayjs();
  const orderTime = dayjs(matchingOrder.orderTime);
  const deliveryTime = dayjs(matchingProduct.estimatedDeliveryTime);
  const percentProgress = ((today.diff(orderTime, 'minute')) / (deliveryTime.diff(orderTime, 'minute'))) * 100;

  trackingHTML = matchingOrder && matchingProduct && productInfo ?
    `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${deliveryTime.format('MMMM D')}
    </div>

    <div class="product-info">
      ${productInfo.name}
    </div>

    <div class="product-info">
      Quantity: ${matchingProduct.quantity}
    </div>

    <img class="product-image" src="${productInfo.image}">

    <div class="progress-labels-container">
      <div class="progress-label js-progress-label-preparing">
        Preparing
      </div>
      <div class="progress-label js-progress-label-shipped">
        Shipped
      </div>
      <div class="progress-label js-progress-label-delivered">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${percentProgress}%;"></div>
    </div>
    ` :
    `
    <div class="delivery-date">Non or Wrong order information</div>
    `;

  updateCartQuantity();

  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;

  if (percentProgress < 50 && matchingOrder && matchingProduct) {
    document.querySelector('.js-progress-label-preparing').classList.add('current-status');
  } else if (percentProgress >= 50 && percentProgress < 100 && matchingOrder && matchingProduct) {
    document.querySelector('.js-progress-label-shipped').classList.add('current-status');
  } else if (percentProgress >= 100 && matchingOrder && matchingProduct) {
    document.querySelector('.js-progress-label-delivered').classList.add('current-status');
  }
}

await renderTrackingInfo();