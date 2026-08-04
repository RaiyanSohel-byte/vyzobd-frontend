"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  FiSearch,
  FiFilter,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiStar,
  FiDownload,
  FiAlertTriangle,
  FiX,
} from "react-icons/fi";
import { toast } from "react-hot-toast";
import { productService } from "@/services/product.service";
// Assume this exists
import { exportProductsToCSV } from "@/utils/exportProductsToCSV";
import { categoryService } from "@/services/category.service";

const initialFormState = {
  title: "",
  slug: "",
  description: "",
  price: "",
  discount: 0,
  category: "", // This will now store the Category ObjectId
  images: "",
  stock: 0,
  isFeatured: false,
};

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Modals State
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    productId: null,
  });

  const [productModal, setProductModal] = useState({
    isOpen: false,
    mode: "add", // 'add' | 'edit'
    productId: null,
  });

  const [categoryModal, setCategoryModal] = useState({
    isOpen: false,
    name: "",
    isSubmitting: false,
  });

  const [formData, setFormData] = useState(initialFormState);

  // Fetch Products & Categories
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsRes, categoriesRes] = await Promise.all([
        productService.getProducts(),
        categoryService.getCategories(),
      ]);

      setProducts(productsRes.data.data || productsRes.data);
      setCategories(categoriesRes.data.data || categoriesRes.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load inventory data");
    } finally {
      setLoading(false);
    }
  };

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const titleMatch = product.title
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      const idMatch = product._id
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesSearch = titleMatch || idMatch;

      // Handle both populated category object or raw ObjectId
      const productCategoryId = product.category?._id || product.category;
      const matchesCategory =
        categoryFilter === "All" || productCategoryId === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, categoryFilter]);

  // Helper for Stock Status Badges
  const getStockStyle = (stock) => {
    if (stock === 0) return "text-accent bg-accent/10 border border-accent/20";
    if (stock <= 10)
      return "text-amber-600 bg-amber-50 border border-amber-200";
    return "text-emerald-600 bg-emerald-50 border border-emerald-200";
  };

  const getStockLabel = (stock) => {
    if (stock === 0) return "Out of Stock";
    if (stock <= 10) return "Low Stock";
    return "In Stock";
  };

  // Delete Handlers
  const promptDelete = (id) => {
    setDeleteModal({ isOpen: true, productId: id });
  };

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, productId: null });
  };

  const confirmDeleteProduct = async () => {
    const { productId } = deleteModal;
    if (!productId) return;

    try {
      await productService.deleteProduct(productId);
      setProducts((prev) =>
        prev.filter((product) => product._id !== productId),
      );
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product");
    } finally {
      setDeleteModal({ isOpen: false, productId: null });
    }
  };

  // Category Modal Handlers
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    setCategoryModal((prev) => ({ ...prev, isSubmitting: true }));

    try {
      const { data } = await categoryService.createCategory({
        name: categoryModal.name.trim(),
      });
      const newCategory = data.data || data;

      setCategories((prev) => [...prev, newCategory]);
      // Auto-select the newly created category in the product form
      setFormData((prev) => ({ ...prev, category: newCategory._id }));
      setCategoryModal({ isOpen: false, name: "", isSubmitting: false });
      toast.success("Category created successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to create category");
      setCategoryModal((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  // Product Modal Handlers
  const openAddModal = () => {
    setFormData(initialFormState);
    setProductModal({ isOpen: true, mode: "add", productId: null });
  };

  const openEditModal = (product) => {
    setFormData({
      title: product.title || "",
      slug: product.slug || "",
      description: product.description || "",
      price: product.price ?? "",
      discount: product.discount ?? 0,
      category: product.category?._id || product.category || "", // Use ObjectId
      images: Array.isArray(product.images) ? product.images.join("\n") : "",
      stock: product.stock ?? 0,
      isFeatured: Boolean(product.isFeatured),
    });
    setProductModal({ isOpen: true, mode: "edit", productId: product._id });
  };

  const closeProductModal = () => {
    setProductModal({ isOpen: false, mode: "add", productId: null });
    setFormData(initialFormState);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      // Auto-generate slug from title if user hasn't modified slug manually in 'add' mode
      if (name === "title" && productModal.mode === "add") {
        updated.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");
      }

      return updated;
    });
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      title: formData.title.trim(),
      slug:
        formData.slug.trim() ||
        formData.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, ""),
      description: formData.description.trim(),
      price: Number(formData.price),
      discount: Number(formData.discount) || 0,
      category: formData.category, // Now sending ObjectId
      images: formData.images
        .split("\n")
        .map((url) => url.trim())
        .filter(Boolean),
      stock: Number(formData.stock) || 0,
      isFeatured: formData.isFeatured,
    };

    try {
      if (productModal.mode === "add") {
        const { data } = await productService.createProduct(payload);
        const createdProduct = data.data || data;

        // If API doesn't populate category on creation, manually populate it for UI state
        if (typeof createdProduct.category === "string") {
          const catObj = categories.find(
            (c) => c._id === createdProduct.category,
          );
          if (catObj) createdProduct.category = catObj;
        }

        setProducts((prev) => [createdProduct, ...prev]);
        toast.success("Product created successfully");
      } else {
        const { data } = await productService.updateProduct(
          productModal.productId,
          payload,
        );
        const updatedProduct = data.data || data;

        // Manually populate category for UI state if needed
        if (typeof updatedProduct.category === "string") {
          const catObj = categories.find(
            (c) => c._id === updatedProduct.category,
          );
          if (catObj) updatedProduct.category = catObj;
        }

        setProducts((prev) =>
          prev.map((p) =>
            p._id === productModal.productId ? { ...p, ...updatedProduct } : p,
          ),
        );
        toast.success("Product updated successfully");
      }
      closeProductModal();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to save product");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Export handling
  const handleExportCSV = () => {
    if (filteredProducts.length === 0) {
      toast.error("No products to export");
      return;
    }
    exportProductsToCSV(filteredProducts);
    toast.success("CSV downloaded successfully");
  };

  if (loading) {
    return (
      <div className="bg-secondary min-h-screen text-primary p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="animate-pulse font-medium tracking-widest uppercase text-primary/50 text-sm">
          Loading inventory...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-secondary min-h-screen text-primary p-4 sm:p-6 lg:p-8 relative">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-primary/10 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">
              Products Inventory
            </h1>
            <p className="text-sm text-primary/60 font-light">
              Manage your catalog, pricing, and stock levels.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 bg-white text-primary text-xs font-medium px-5 py-2.5 rounded-md border border-primary/10 hover:bg-secondary/50 transition-all shadow-sm"
            >
              <FiDownload className="w-4 h-4" />
              Export CSV
            </button>
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 bg-primary text-white text-xs font-medium px-5 py-2.5 rounded-md hover:bg-primary/90 transition-all shadow-sm"
            >
              <FiPlus className="w-4 h-4" />
              Add New Product
            </button>
          </div>
        </div>

        {/* Toolbar: Search & Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-lg border border-primary/10 shadow-sm">
          {/* Search */}
          <div className="relative w-full sm:w-96">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
            <input
              type="text"
              placeholder="Search by Product Name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-secondary text-primary text-sm pl-10 pr-4 py-2.5 rounded-md border border-primary/10 focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2 text-sm text-primary/60 font-medium">
              <FiFilter className="w-4 h-4" />
              <span className="hidden sm:inline">Category:</span>
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full sm:w-auto bg-secondary text-primary text-sm px-4 py-2.5 rounded-md border border-primary/10 focus:outline-none focus:border-accent shadow-sm cursor-pointer"
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg border border-primary/10 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-secondary/50 text-xs uppercase tracking-wider text-primary/60 border-b border-primary/10">
                  <th className="px-6 py-4 font-semibold">Product</th>
                  <th className="px-6 py-4 font-semibold">Category</th>
                  <th className="px-6 py-4 font-semibold">Pricing</th>
                  <th className="px-6 py-4 font-semibold">Stock</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm font-light">
                {filteredProducts.length === 0 ?
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-primary/50"
                    >
                      No products found matching your criteria.
                    </td>
                  </tr>
                : filteredProducts.map((product) => {
                    const finalPrice =
                      product.price * (1 - (product.discount || 0) / 100);

                    return (
                      <tr
                        key={product._id}
                        className="border-b border-primary/5 hover:bg-secondary/30 transition-colors"
                      >
                        {/* Product Detail (Image + Title) */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-14 bg-secondary rounded-md overflow-hidden relative flex-shrink-0 border border-primary/10">
                              <Image
                                src={product.images?.[0] || "/placeholder.png"}
                                alt={product.title || "Product image"}
                                fill
                                className="object-cover"
                                sizes="48px"
                              />
                            </div>
                            <div>
                              <div className="font-medium text-primary mb-1 truncate max-w-[200px]">
                                {product.title}
                              </div>
                              <div className="text-xs text-primary/50">
                                #{product._id?.slice(-6).toUpperCase()}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-6 py-4 text-primary/70">
                          {product.category?.name ||
                            product.category ||
                            "Uncategorized"}
                        </td>

                        {/* Pricing */}
                        <td className="px-6 py-4">
                          <div className="flex items-baseline gap-2">
                            <span className="font-medium text-primary">
                              ৳{finalPrice.toFixed(2)}
                            </span>
                            {product.discount > 0 && (
                              <span className="text-xs text-primary/40 line-through">
                                ৳{(product.price || 0).toFixed(2)}
                              </span>
                            )}
                          </div>
                          {product.discount > 0 && (
                            <div className="text-[10px] font-bold text-accent mt-0.5 tracking-wider uppercase">
                              {product.discount}% Off
                            </div>
                          )}
                        </td>

                        {/* Stock & Inventory */}
                        <td className="px-6 py-4">
                          <div className="flex flex-col items-start gap-1.5">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${getStockStyle(
                                product.stock,
                              )}`}
                            >
                              {getStockLabel(product.stock)}
                            </span>
                            <span className="text-xs text-primary/60">
                              {product.stock || 0} units left
                            </span>
                          </div>
                        </td>

                        {/* Status / Featured / Ratings */}
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-2">
                            {product.isFeatured && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                                <FiStar className="w-3 h-3 fill-primary" />
                                Featured
                              </span>
                            )}
                            <div className="flex items-center gap-1 text-xs text-primary/60">
                              <FiStar className="w-3 h-3" />
                              {product.rating || 0} ({product.numReviews || 0})
                            </div>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEditModal(product)}
                              className="p-2 text-primary/50 hover:text-primary hover:bg-secondary rounded-md transition-colors"
                              title="Edit Product"
                            >
                              <FiEdit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => promptDelete(product._id)}
                              className="p-2 text-primary/50 hover:text-accent hover:bg-accent/10 rounded-md transition-colors"
                              title="Delete Product"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {productModal.isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl border border-primary/10 max-w-2xl w-full my-8 p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-primary/10 pb-4">
              <h3 className="text-lg font-semibold text-primary">
                {productModal.mode === "add" ?
                  "Add New Product"
                : "Edit Product"}
              </h3>
              <button
                onClick={closeProductModal}
                className="p-1 text-primary/50 hover:text-primary rounded-md transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitProduct} className="space-y-4 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-semibold text-primary/70 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Product title"
                    className="w-full bg-secondary text-primary text-sm px-3 py-2 rounded-md border border-primary/10 focus:outline-none focus:border-accent"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-xs font-semibold text-primary/70 mb-1">
                    Slug *
                  </label>
                  <input
                    type="text"
                    name="slug"
                    required
                    value={formData.slug}
                    onChange={handleInputChange}
                    placeholder="product-slug"
                    className="w-full bg-secondary text-primary text-sm px-3 py-2 rounded-md border border-primary/10 focus:outline-none focus:border-accent"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs font-semibold text-primary/70 mb-1">
                    Price (৳) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    step="0.01"
                    min="0"
                    required
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    className="w-full bg-secondary text-primary text-sm px-3 py-2 rounded-md border border-primary/10 focus:outline-none focus:border-accent"
                  />
                </div>

                {/* Discount */}
                <div>
                  <label className="block text-xs font-semibold text-primary/70 mb-1">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    name="discount"
                    min="0"
                    max="100"
                    value={formData.discount}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full bg-secondary text-primary text-sm px-3 py-2 rounded-md border border-primary/10 focus:outline-none focus:border-accent"
                  />
                </div>

                {/* Category (Select + Add New) */}
                <div>
                  <label className="block text-xs font-semibold text-primary/70 mb-1">
                    Category *
                  </label>
                  <div className="flex gap-2">
                    <select
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full bg-secondary text-primary text-sm px-3 py-2 rounded-md border border-primary/10 focus:outline-none focus:border-accent"
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() =>
                        setCategoryModal({
                          isOpen: true,
                          name: "",
                          isSubmitting: false,
                        })
                      }
                      className="px-3 py-2 bg-primary/5 text-primary border border-primary/10 hover:bg-primary/10 rounded-md text-sm font-medium transition-colors whitespace-nowrap shadow-sm flex items-center gap-1"
                    >
                      <FiPlus className="w-3.5 h-3.5" />
                      New
                    </button>
                  </div>
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-xs font-semibold text-primary/70 mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stock"
                    min="0"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full bg-secondary text-primary text-sm px-3 py-2 rounded-md border border-primary/10 focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-primary/70 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  required
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Detailed product description..."
                  className="w-full bg-secondary text-primary text-sm px-3 py-2 rounded-md border border-primary/10 focus:outline-none focus:border-accent resize-none"
                />
              </div>

              {/* Image URLs */}
              <div>
                <label className="block text-xs font-semibold text-primary/70 mb-1">
                  Image URLs (One per line)
                </label>
                <textarea
                  name="images"
                  rows={2}
                  value={formData.images}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                  className="w-full bg-secondary text-primary text-sm px-3 py-2 rounded-md border border-primary/10 focus:outline-none focus:border-accent resize-none"
                />
              </div>

              {/* Featured Toggle */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isFeatured"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-primary rounded border-primary/20 focus:ring-accent cursor-pointer"
                />
                <label
                  htmlFor="isFeatured"
                  className="text-sm text-primary font-medium cursor-pointer"
                >
                  Mark as Featured Product
                </label>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-primary/10">
                <button
                  type="button"
                  onClick={closeProductModal}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-primary bg-secondary border border-primary/10 hover:bg-secondary/70 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 disabled:opacity-50 rounded-md transition-colors shadow-sm"
                >
                  {isSubmitting ?
                    "Saving..."
                  : productModal.mode === "add" ?
                    "Create Product"
                  : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Add Category Modal (Z-Index higher than Product Modal) */}
      {categoryModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl border border-primary/10 max-w-sm w-full p-6 animate-in fade-in zoom-in duration-200">
            <h3 className="text-lg font-semibold text-primary mb-4">
              Add New Category
            </h3>
            <form onSubmit={handleCreateCategory}>
              <div className="mb-6">
                <label className="block text-xs font-semibold text-primary/70 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={categoryModal.name}
                  onChange={(e) =>
                    setCategoryModal({ ...categoryModal, name: e.target.value })
                  }
                  placeholder="e.g. Dairy Products"
                  className="w-full bg-secondary text-primary text-sm px-3 py-2 rounded-md border border-primary/10 focus:outline-none focus:border-accent"
                />
              </div>
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setCategoryModal({
                      isOpen: false,
                      name: "",
                      isSubmitting: false,
                    })
                  }
                  disabled={categoryModal.isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-primary bg-secondary border border-primary/10 hover:bg-secondary/70 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={categoryModal.isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 disabled:opacity-50 rounded-md transition-colors shadow-sm"
                >
                  {categoryModal.isSubmitting ? "Saving..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl border border-primary/10 max-w-sm w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <FiAlertTriangle className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">
                  Delete Product?
                </h3>
                <p className="text-sm text-primary/60 mt-1">
                  Are you sure you want to delete product{" "}
                  <span className="font-medium text-primary">
                    #{deleteModal.productId?.slice(-6).toUpperCase()}
                  </span>
                  ? This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-8">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-sm font-medium text-primary bg-secondary border border-primary/10 hover:bg-secondary/70 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteProduct}
                className="px-4 py-2 text-sm font-medium text-white bg-accent hover:bg-accent/90 rounded-md transition-colors shadow-sm"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
