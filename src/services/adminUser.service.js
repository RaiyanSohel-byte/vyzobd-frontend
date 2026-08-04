import api from "@/lib/axios";

export const adminUserService = {
  // Get all users
  getUsers(params = {}) {
    return api.get("/api/admin/users", {
      params,
    });
  },

  // Get one user
  getUser(id) {
    return api.get(`/api/admin/users/${id}`);
  },

  // Update role
  updateRole(id, role) {
    return api.put(`/api/admin/users/${id}/role`, {
      role,
    });
  },

  // Delete
  deleteUser(id) {
    return api.delete(`/api/admin/users/${id}`);
  },
};
