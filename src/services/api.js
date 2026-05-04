const BASE_URL = "https://dummyjson.com";

async function apiRequest(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Não foi possível carregar os dados da API.");
  }

  return response.json();
}

export async function getProducts() {
  const data = await apiRequest(`${BASE_URL}/products?limit=0`);
  return data.products || [];
}

export async function getProductById(id) {
  return apiRequest(`${BASE_URL}/products/${id}`);
}