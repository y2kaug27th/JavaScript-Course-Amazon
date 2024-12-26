import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "./data/products.js";
import {cart} from "./data/cart-class.js";

await loadProductsFetch();
renderCheckoutHeader();
renderOrderSummary(cart);
renderPaymentSummary();
