//class is a blueprint for creating objects
class Cart {
  cartItems;

  //# defines a private property that can only be accessed within the class
  #localStorageKey;

  //constructor is a special method that is called when a new instance of the class is created
  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  };

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  };

  saveToStorage() {localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems))};

  addToCart(productId, quantity) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: quantity,
        deliveryOptionId: '1'
      });
    }
    this.saveToStorage();
  };

  removeFromCart(productId) {
    const newCart = [];

    this.cartItems.forEach((cartItem) =>{
      if(cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    })

    this.cartItems = newCart;
    this.saveToStorage();
  };

  calculateCartQuantity() {
    let cartQuantity = 0;

    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    return cartQuantity;
  };

  updateQuantity(productId, newQuantity) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem)
      matchingItem.quantity = newQuantity;

    this.saveToStorage();
  };

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem)
      matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  };

  updateCartQuantity() {
    const cartQuantity = this.calculateCartQuantity();
    document.querySelector('.js-return-to-home-link')
      .innerHTML = cartQuantity === 0 ? 'No item' : `${cartQuantity} items`;
  }
}

export const cart = new Cart('cart-oop');
