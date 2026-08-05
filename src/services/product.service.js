import api from "@/lib/axios";

export const productService = {
  // Public
  getProducts: () => api.get("/api/products"),

  getProduct: (id) => api.get(`/api/products/${id}`),

  // Admin
  createProduct(data) {
    return api.post("/api/products", data);
  },

  updateProduct(id, data) {
    return api.put(`/api/products/${id}`, data);
  },

  deleteProduct: (id) => api.delete(`/api/products/${id}`),
};
