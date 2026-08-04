import api from "@/lib/axios";

export const categoryService = {
  // Get all categories
  getCategories(params = {}) {
    return api.get("/api/categories", {
      params,
    });
  },

  // Get one category
  getCategory(id) {
    return api.get(`/api/categories/${id}`);
  },

  // Create category
  createCategory(categoryData) {
    return api.post("/api/categories", categoryData);
  },

  // Update category
  updateCategory(id, categoryData) {
    return api.put(`/api/categories/${id}`, categoryData);
  },

  // Delete category
  deleteCategory(id) {
    return api.delete(`/api/categories/${id}`);
  },
};
