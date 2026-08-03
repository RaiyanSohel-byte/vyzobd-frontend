import api from "@/lib/axios";

export const authService = {
  login: (data) => api.post("/api/auth/login", data),

  register: (data) => api.post("/api/auth/register", data),

  logout: () => api.post("/api/auth/logout"),

  getMe: () => api.get("/api/auth/me"),

  forgotPassword: (data) => api.post("/api/auth/forgot-password", data),

  resetPassword: (token, data) =>
    api.post(`/api/auth/reset-password/${token}`, data),

  verifyEmail: (token) => api.get(`/api/auth/verify-email/${token}`),

  resendVerification: (data) => api.post("/api/auth/resend-verification", data),
};
