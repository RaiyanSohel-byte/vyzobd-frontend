import api from "@/lib/axios";

export const dashboardService = {
  getDashboard() {
    return api.get("/api/dashboard");
  },
};
