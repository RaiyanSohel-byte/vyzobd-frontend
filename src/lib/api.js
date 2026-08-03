// lib/api.js

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Generic fetch helper
export async function fetchAPI(endpoint, options = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    cache: "no-store",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// Get all products
export async function getProducts() {
  return fetchAPI("/api/products");
}

// Get product by ID
export async function getProductById(id) {
  return fetchAPI(`/api/products/${id}`);
}

// Get all categories
export async function getCategories() {
  return fetchAPI("/api/categories");
}
