import api from "@/lib/axios";

export const orderService = {
  // User
  createOrder: (orderData) => api.post("/api/orders", orderData),

  getMyOrders: () => api.get("/api/orders/my-orders"),

  // Admin
  getAllOrders: () => api.get("/api/orders"),

  updateOrderStatus: (orderId, orderStatus) =>
    api.put(`/api/orders/${orderId}/status`, { orderStatus }),

  updatePaymentStatus: (orderId, paymentStatus) =>
    api.put(`/api/orders/${orderId}/payment`, {
      paymentStatus,
    }),

  deleteOrder: (orderId) => api.delete(`/api/orders/${orderId}`),
};
