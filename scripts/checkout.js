import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "./data/products.js";

await loadProductsFetch();
renderCheckoutHeader();
renderOrderSummary();
renderPaymentSummary();
