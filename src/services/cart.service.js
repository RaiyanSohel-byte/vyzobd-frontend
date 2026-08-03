import api from "@/lib/axios";

export const cartService = {
  getCart: () => api.get("/api/cart"),

  addToCart: (cartData) => api.post("/api/cart", cartData),

  updateCart: (cartData) => api.put("/api/cart", cartData),

  removeItem: (cartData) =>
    api.delete("/api/cart", {
      data: cartData,
    }),

  clearCart: (userId) => api.delete(`/api/cart/${userId}/clear`),
};
