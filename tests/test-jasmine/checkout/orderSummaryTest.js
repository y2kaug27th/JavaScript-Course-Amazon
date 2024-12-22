import {renderOrderSummary} from "../../../scripts/checkout/orderSummary.js";
import {cart, loadFromStorage} from "../../../scripts/data/cart.js";

describe('Test suite: renderOrderSummary', () => {

  // beforeEach() is a Jasmine function that allows us to run a function before each of the tests in this suite.
  // It's useful for setting up the DOM or other state that we want to test against.
  // There's also afterEach(), beforeAll(), and afterAll().
  beforeEach(() => {
    document.querySelector('.js-test-container').innerHTML =
      `<div class="js-order-summary"></div>
      <div class="js-return-to-home-link"></div>`;

    document.querySelector('.js-test-container').innerHTML =
      `<div class="js-order-summary"></div>
       <div class="js-return-to-home-link"></div>
       <div class="js-payment-summary"></div>`;

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 2,
        deliveryOptionId: '2'
      }]);
    });

    loadFromStorage();
    spyOn(localStorage, 'setItem');
    renderOrderSummary();
  })

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = ``;
  })

  it('Display the cart', () => {
    expect(document.querySelector('.js-order-summary').innerHTML).toContain('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(document.querySelector('.js-order-summary').innerHTML).toContain('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(document.querySelector('.js-quantity-label-e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
      .innerHTML).toEqual('1');
    expect(document.querySelector('.js-quantity-label-15b6fc6f-327a-4ec4-896f-486349e85a3d')
      .innerHTML).toEqual('2');
  })

  it('Remove the product', () => {
    document.querySelector('.js-delete-link-e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
      .click();
    expect(document.querySelectorAll('.cart-item-container').length).toEqual(1);
    expect(document.querySelector('.js-order-summary').innerHTML).not.toContain('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(document.querySelector('.js-order-summary').innerHTML).toContain('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
  })
})