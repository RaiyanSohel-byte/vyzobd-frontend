"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  FiSearch,
  FiFilter,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiStar,
} from "react-icons/fi";

// --- Mock Data (Based on your exact schema) ---
const MOCK_PRODUCTS = [
  {
    _id: "PROD-1001",
    title: "Architectural Wool Overcoat",
    slug: "architectural-wool-overcoat",
    description:
      "A premium heavyweight wool overcoat with structured shoulders.",
    price: 320,
    discount: 15,
    category: "Outerwear",
    images: ["/placeholder.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Charcoal", hex: "#333333" }],
    stock: 12,
    rating: 4.8,
    numReviews: 24,
    isFeatured: true,
    createdAt: "2026-07-15T10:00:00Z",
    updatedAt: "2026-07-20T14:30:00Z",
  },
  {
    _id: "PROD-1002",
    title: "Minimalist Linen Trousers",
    slug: "minimalist-linen-trousers",
    description: "Breathable, wide-leg trousers perfect for summer days.",
    price: 110,
    discount: 0,
    category: "Bottoms",
    images: ["/placeholder.jpg"],
    sizes: ["30", "32", "34", "36"],
    colors: [{ name: "Sand", hex: "#C2B280" }],
    stock: 5, // Low stock
    rating: 4.5,
    numReviews: 18,
    isFeatured: false,
    createdAt: "2026-07-10T09:15:00Z",
    updatedAt: "2026-07-12T11:00:00Z",
  },
  {
    _id: "PROD-1003",
    title: "Heavyweight Boxy Tee",
    slug: "heavyweight-boxy-tee",
    description: "100% organic cotton tee with a structured, oversized fit.",
    price: 65,
    discount: 0,
    category: "Tops",
    images: ["/placeholder.jpg"],
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Olive", hex: "#556B2F" },
      { name: "Black", hex: "#000000" },
    ],
    stock: 45,
    rating: 4.9,
    numReviews: 112,
    isFeatured: true,
    createdAt: "2026-06-25T14:20:00Z",
    updatedAt: "2026-07-05T16:45:00Z",
  },
  {
    _id: "PROD-1004",
    title: "Structured Leather Tote",
    slug: "structured-leather-tote",
    description: "Everyday carry tote made from full-grain Italian leather.",
    price: 250,
    discount: 20,
    category: "Accessories",
    images: ["/placeholder.jpg"],
    sizes: ["OS"],
    colors: [{ name: "Tan", hex: "#D2B48C" }],
    stock: 0, // Out of stock
    rating: 4.7,
    numReviews: 35,
    isFeatured: false,
    createdAt: "2026-05-18T11:05:00Z",
    updatedAt: "2026-08-01T08:00:00Z",
  },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product._id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" || product.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter]);

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

  return (
    <div className="bg-secondary min-h-screen text-primary p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
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
          <button className="flex items-center gap-2 bg-primary text-white text-xs font-medium px-5 py-2.5 rounded-md hover:bg-primary/90 transition-all shadow-sm">
            <FiPlus className="w-4 h-4" />
            Add New Product
          </button>
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
              <option value="Outerwear">Outerwear</option>
              <option value="Tops">Tops</option>
              <option value="Bottoms">Bottoms</option>
              <option value="Accessories">Accessories</option>
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
                              {/* Assuming Next.js Image is used for real images, fallback to div for styling */}
                              <div className="w-full h-full bg-primary/5 flex items-center justify-center text-[10px] text-primary/30 uppercase">
                                Img
                              </div>
                            </div>
                            <div>
                              <div className="font-medium text-primary mb-1 truncate max-w-[200px]">
                                {product.title}
                              </div>
                              <div className="text-xs text-primary/50">
                                {product._id}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-6 py-4 text-primary/70">
                          {product.category}
                        </td>

                        {/* Pricing */}
                        <td className="px-6 py-4">
                          <div className="flex items-baseline gap-2">
                            <span className="font-medium text-primary">
                              ${finalPrice.toFixed(2)}
                            </span>
                            {product.discount > 0 && (
                              <span className="text-xs text-primary/40 line-through">
                                ${product.price.toFixed(2)}
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
                              className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${getStockStyle(product.stock)}`}
                            >
                              {getStockLabel(product.stock)}
                            </span>
                            <span className="text-xs text-primary/60">
                              {product.stock} units left
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
                              {product.rating} ({product.numReviews})
                            </div>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              className="p-2 text-primary/50 hover:text-primary hover:bg-secondary rounded-md transition-colors"
                              title="Edit Product"
                            >
                              <FiEdit2 className="w-4 h-4" />
                            </button>
                            <button
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

          {/* Pagination Footer */}
          <div className="p-4 border-t border-primary/10 flex items-center justify-between text-xs text-primary/60">
            <span>Showing {filteredProducts.length} products</span>
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1.5 border border-primary/10 rounded-md hover:bg-secondary transition-colors disabled:opacity-50"
                disabled
              >
                Previous
              </button>
              <button
                className="px-3 py-1.5 border border-primary/10 rounded-md hover:bg-secondary transition-colors disabled:opacity-50"
                disabled
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
