class Order {
  orders;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  };

  #loadFromStorage() {
    this.orders = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  };

  addToOrder(order) {
    this.orders.unshift(order);
    this.saveToStorage();
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.orders));
  }
}

export const orderPlaced = new Order('order');