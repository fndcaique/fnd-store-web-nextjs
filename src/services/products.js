let data = [];

export function saveProducts(products) {
  // localStorage.setItem('products', JSON.stringify(products));
  data = products;
}

export function getProducts() {
  // return JSON.parse(localStorage.getItem('products')) || [];
  return data;
}
