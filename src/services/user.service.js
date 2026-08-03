import api from "@/lib/axios";

export const userService = {
  getProfile: () => api.get("/api/users/profile"),

  updateProfile: (data) => api.put("/api/users/profile", data),

  changePassword: (data) => api.put("/api/users/change-password", data),
};
