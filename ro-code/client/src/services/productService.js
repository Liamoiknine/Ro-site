const BASE = process.env.REACT_APP_API_ENDPOINT_URL;

export async function getProducts() {
  const res = await fetch(`${BASE}/api/products`);
  if (!res.ok) throw new Error('Could not fetch products');
  return res.json(); // should be an array of {id, title, images, price, …}
}

export async function getProduct(id) {
  const res = await fetch(`${BASE}/api/products/${id}`);
  if (!res.ok) throw new Error('Could not fetch product');
  return res.json();
}