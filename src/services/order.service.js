// services/order.service.js

import api from "@/lib/axios";

export const orderService = {
  createOrder: (orderData) => api.post("/api/orders", orderData),

  getMyOrders: () => api.get("/api/orders/my-orders"),
};
