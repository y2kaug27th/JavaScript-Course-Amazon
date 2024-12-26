import {formatCurrency} from "../utils/money.js";

export function getProduct(productId) {
  let matchingProduct;

  products.forEach((product) => {
    if(product.id === productId) {
      matchingProduct = product;
    }
  })
  return matchingProduct;
}

export class Product {
  id;
  image;
  name;
  rating;
  priceCents;
  keywords;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.keywords = productDetails.keywords;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`
  }

  extraInfoHTML() {
    return ``;
  }
}

export class Clothing extends Product {
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    return `<a href="${this.sizeChartLink}" target="_blank">
      Size chart
    </a>`;
  }
}

export class Appliance extends Product {
  instructionsLink;
  warrantyLink;

  constructor(ProductDetails) {
    super(ProductDetails);
    this.instructionsLink = ProductDetails.instructionsLink;
    this.warrantyLink = ProductDetails.warrantyLink;
  }

  extraInfoHTML() {
    return `
    <div>
      <a href="${this.instructionsLink}" target="_blank">
        Instructions
      </a>
    </div>
    <div>
      <a href="${this.warrantyLink}" target="_blank">
        Warranty
      </a>
    </div>
    `}

}

export let products = [];

export async function loadProductsFetch() {
  try {
    const response = await fetch('https://supersimplebackend.dev/products');
    const productsData = await response.json();

    products = productsData.map((product) => {
      if (product.type === `clothing`) {
        return new Clothing(product);
      } else if (product.keywords.includes(`appliances`)) {
        product.type = `appliance`;
        product.instructionsLink = 'images/appliance-instructions.png';
        product.warrantyLink = 'images/appliance-warranty.png';
        return new Appliance(product);
      } else {
        return new Product(product);
      }
    })
  } catch (error) {
    console.error(error);
  }
}
