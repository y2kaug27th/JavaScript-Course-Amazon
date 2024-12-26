import {cartTest} from "../../../../scripts/data/cart-class.js";

describe('Test suite: addToCart', () => {

  afterEach(() => {
    cartTest.cartItems = [];
  })

  // Mocks the localStorage.getItem method to return an empty array
  // jasmine.spyOn is used to spy on the method
  // and.callFake is used to specify the implementation of the method
  // In this case, we want to return an empty array, so we use JSON.stringify([])
  it('Add a product to the cart', () => {

    cartTest.cartItems = [];

    cartTest.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
    expect(cartTest.cartItems.length).toEqual(1);
    expect(cartTest.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cartTest.cartItems[0].quantity).toEqual(1);
  })

  it('Display the existing product in the cart', () => {

    cartTest.cartItems = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }];

    expect(cartTest.cartItems.length).toEqual(1);
    expect(cartTest.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cartTest.cartItems[0].quantity).toEqual(1);

  });

})