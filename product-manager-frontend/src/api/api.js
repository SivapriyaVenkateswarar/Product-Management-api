const API_URL = 'http://localhost:3001/api/products';

export const saveJWT = (token) => localStorage.setItem('jwtToken', token);
export const getJWT = () => localStorage.getItem('jwtToken');
export const clearJWT = () => localStorage.removeItem('jwtToken');

const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getJWT()}`,
});

export const loginAPI = async (clientKey, clientSecret) => {
  // Example login endpoint
  const res = await fetch('http://localhost:3001/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clientKey, clientSecret }),
  });
  if (!res.ok) throw new Error('Login failed');
  const data = await res.json();
  saveJWT(data.token);
  return data;
};

export const fetchProductsAPI = async () => {
  const res = await fetch(API_URL, { headers: getHeaders() });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
};

export const saveProductAPI = async (product, id = null) => {
  const method = id ? 'PATCH' : 'POST';
  const url = id ? `${API_URL}/${id}` : API_URL;
  const res = await fetch(url, {
    method,
    headers: getHeaders(),
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error('Failed to save product');
  return res.json();
};

export const deleteProductAPI = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE', headers: getHeaders() });
  if (!res.ok) throw new Error('Failed to delete product');
  return res.json();
};
