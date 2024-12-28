import { cart } from "./data/cart-class.js";
import { products, loadProductsFetch } from "./data/products.js";
import {updateCartQuantity} from "./utils/cartQuantity.js";
//use as to rename the variable (cart as myCart)

await loadProductsFetch();
let searchInput = '';
renderProductsGrid();

function renderProductsGrid() {

let productsHTML = '';

let filteredProduct = products;

if (searchInput) {
  filteredProduct = products.filter((product) => {
    let matchingKeyword = false;

    product.keywords.forEach((keyword) => {
      if (keyword.toLowerCase().includes(searchInput.toLowerCase())) {
        matchingKeyword = true;
      }
    });
    return matchingKeyword || product.name.toLowerCase().includes(searchInput.toLowerCase());
  })
}

if (filteredProduct.length === 0) {
  productsHTML =
    `
    <div class="no-products-found">No products found.</div>
    `
} else {
  filteredProduct.forEach((product) => {

    productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="${product.getStarsUrl()}">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${product.getPrice()}
      </div>

      <div class="js-product-quantity-container-${product.id}">
        <select class="js-product-quantity-selector">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
      
      <div>
      ${product.extraInfoHTML()}
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
  });
}

document.querySelector('.js-products-grid').innerHTML = productsHTML;

updateCartQuantity();

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      //productId is the value of the data-product-id attribute

      const quantitySelector = document.querySelector(`
        .js-product-quantity-container-${productId} select`);

      const quantity = Number(quantitySelector.value);

      cart.addToCart(productId, quantity);

      updateCartQuantity();
    });
  });
}

document.querySelector('.js-search-button').addEventListener('click', () => {
  searchInput = document.querySelector('.js-search-bar').value;
  renderProductsGrid();
});

document.querySelector('.js-search-bar').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    searchInput = document.querySelector('.js-search-bar').value;}
  renderProductsGrid();
});