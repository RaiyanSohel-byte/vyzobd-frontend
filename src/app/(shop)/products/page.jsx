"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiSearch, FiSliders, FiX, FiStar, FiCheck } from "react-icons/fi";

// Import your helper functions (Adjust the path if your lib folder is located elsewhere)
import { getProducts, getCategories } from "@/lib/api";

export default function ProductsPage() {
  // Data state
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [maxPrice, setMaxPrice] = useState(1000);
  // Filter state management
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [priceRange, setPriceRange] = useState([0, maxPrice]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);

        // Handle products data structure
        const productList = productsRes?.data || productsRes || [];
        setProducts(productList);
        const highestPrice = Math.max(
          ...productList.map((product) => product.price),
          0,
        );

        setMaxPrice(highestPrice);
        setPriceRange([0, highestPrice]);
        // Handle categories data structure (supporting string arrays or object arrays with name/title)
        const categoryList = categoriesRes?.data || categoriesRes || [];
        const formattedCategories = categoryList.map((cat) =>
          typeof cat === "string" ? cat : cat.name || cat.title || cat.category,
        );

        setCategories(["All", ...new Set(formattedCategories.filter(Boolean))]);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError(
          "Failed to load products and categories. Please try again later.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");

    setPriceRange([0, maxPrice]);
    setInStockOnly(false);
    setSortBy("featured");
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Search
        if (
          searchQuery &&
          !product.title?.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.description
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
        ) {
          return false;
        }

        // Category
        const categoryName =
          typeof product.category === "string" ?
            product.category
          : product.category?.name;

        if (selectedCategory !== "All" && categoryName !== selectedCategory) {
          return false;
        }

        // Price
        const finalPrice = product.price * (1 - (product.discount || 0) / 100);

        if (finalPrice < priceRange[0] || finalPrice > priceRange[1]) {
          return false;
        }

        // Stock
        if (inStockOnly && product.stock <= 0) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        const priceA = a.price * (1 - (a.discount || 0) / 100);
        const priceB = b.price * (1 - (b.discount || 0) / 100);

        switch (sortBy) {
          case "price-low":
            return priceA - priceB;
          case "price-high":
            return priceB - priceA;
          case "rating":
            return (b.rating || 0) - (a.rating || 0);
          case "newest":
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
          case "featured":
          default:
            return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
        }
      });
  }, [
    products,
    searchQuery,
    selectedCategory,
    priceRange,
    inStockOnly,

    sortBy,
  ]);

  const activeFiltersCount =
    (selectedCategory !== "All" ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 500 ? 1 : 0);

  return (
    <div className="bg-secondary min-h-screen text-primary py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 border-b border-primary/10 pb-6">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Explore Collection
          </h1>
          <p className="text-primary/60 text-sm font-light">
            Architectural silhouettes, premium fabrics, and sustainable design.
          </p>
        </div>

        {/* Top Controls: Search & Mobile Filter Toggle */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-primary text-sm pl-10 pr-4 py-2.5 rounded-md border border-primary/10 focus:outline-none focus:border-accent transition-colors shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary"
              >
                <FiX className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center justify-center gap-2 bg-primary text-white text-sm px-4 py-2.5 rounded-md w-full md:w-auto shadow-sm"
            >
              <FiSliders className="w-4 h-4" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-accent text-white text-xs px-2 py-0.5 rounded-full ml-1">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Sorting Dropdown */}
            <div className="relative flex items-center gap-2 min-w-[200px]">
              <span className="text-xs text-primary/60 uppercase font-semibold tracking-wider whitespace-nowrap hidden sm:inline">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-white text-primary text-sm px-3 py-2.5 rounded-md border border-primary/10 focus:outline-none focus:border-accent shadow-sm cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Tags */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-8 bg-white p-3.5 rounded-md border border-primary/10 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary/50 mr-2">
              Active Filters:
            </span>
            {selectedCategory !== "All" && (
              <FilterTag
                label={`Category: ${selectedCategory}`}
                onRemove={() => setSelectedCategory("All")}
              />
            )}

            {inStockOnly && (
              <FilterTag
                label="In Stock Only"
                onRemove={() => setInStockOnly(false)}
              />
            )}
            {(priceRange[0] > 0 || priceRange[1] < 500) && (
              <FilterTag
                label={`Price: $${priceRange[0]} - $${priceRange[1]}`}
                onRemove={() => setPriceRange([0, maxPrice])}
              />
            )}
            <button
              onClick={clearAllFilters}
              className="text-xs text-accent font-semibold hover:underline ml-auto"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-lg border border-primary/10 shadow-sm sticky top-6 space-y-8">
            <SidebarContent
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              maxPrice={maxPrice}
              inStockOnly={inStockOnly}
              setInStockOnly={setInStockOnly}
              clearAllFilters={clearAllFilters}
              activeFiltersCount={activeFiltersCount}
            />
          </aside>

          {/* Product Grid / Loading / Error States */}
          <main className="lg:col-span-9">
            {isLoading ?
              <div className="flex flex-col items-center justify-center py-32 space-y-4">
                <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <p className="text-xs uppercase tracking-widest text-primary/50">
                  Loading Collection...
                </p>
              </div>
            : error ?
              <div className="bg-white rounded-lg border border-red-200 p-12 text-center my-8">
                <p className="text-sm font-medium text-red-500 mb-2">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 text-xs uppercase tracking-widest text-primary underline underline-offset-4"
                >
                  Try Again
                </button>
              </div>
            : filteredProducts.length === 0 ?
              <div className="bg-white rounded-lg border border-primary/10 p-12 text-center my-8">
                <p className="text-lg font-medium text-primary mb-2">
                  No products match your criteria
                </p>
                <p className="text-sm text-primary/60 mb-6">
                  Try adjusting your filters or search query to find what
                  you&apos;re looking for.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-primary text-white text-sm px-6 py-2.5 rounded-md hover:bg-primary/90 transition-colors shadow-sm"
                >
                  Reset All Filters
                </button>
              </div>
            : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product._id || product.slug}
                    product={product}
                  />
                ))}
              </div>
            }
          </main>
        </div>
      </div>

      {/* Mobile Drawer Filter */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full flex flex-col shadow-xl z-10">
            <div className="flex items-center justify-between p-4 border-b border-primary/10">
              <h2 className="text-base font-bold uppercase tracking-wider">
                Filter Products
              </h2>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 text-primary/60 hover:text-primary"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 space-y-8">
              <SidebarContent
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                inStockOnly={inStockOnly}
                setInStockOnly={setInStockOnly}
                clearAllFilters={clearAllFilters}
                activeFiltersCount={activeFiltersCount}
              />
            </div>
            <div className="p-4 border-t border-primary/10 bg-secondary/50">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-primary text-white text-sm py-3 rounded-md font-medium shadow-sm"
              >
                Show {filteredProducts.length} Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Sidebar Filter Section Component ---
function SidebarContent({
  categories,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  maxPrice,
  inStockOnly,
  setInStockOnly,
  clearAllFilters,
  activeFiltersCount,
}) {
  return (
    <>
      <div className="flex items-center justify-between border-b border-primary/10 pb-4">
        <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-primary">
          Filters
        </h3>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-xs text-accent hover:underline font-semibold"
          >
            Reset
          </button>
        )}
      </div>

      {/* Categories Filter */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-primary/60 mb-3">
          Category
        </h4>
        <div className="space-y-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`cursor-pointer w-full text-left text-sm py-1.5 px-3 rounded-md transition-colors ${
                selectedCategory === cat ?
                  "bg-accent text-white font-semibold"
                : "text-primary/70 hover:bg-secondary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-primary/60">
            Price Range
          </h4>
          <span className="text-xs font-medium text-primary">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max={maxPrice}
          step="10"
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([priceRange[0], Number(e.target.value)])
          }
          className="w-full accent-accent cursor-pointer"
        />
      </div>

      {/* Stock Filter */}
      <div className="pt-2 border-t border-primary/10">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="w-4 h-4 accent-accent rounded border-primary/20 cursor-pointer"
          />
          <span className="text-sm text-primary/80">In Stock Only</span>
        </label>
      </div>
    </>
  );
}

// --- Active Filter Tag Helper ---
function FilterTag({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs bg-secondary text-primary px-2.5 py-1 rounded-md border border-primary/10">
      {label}
      <button onClick={onRemove} className="hover:text-accent">
        <FiX className="w-3 h-3" />
      </button>
    </span>
  );
}

// --- ProductCard Component ---
function ProductCard({ product }) {
  const discountedPrice =
    product.discount > 0 ?
      product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <div className="group bg-white rounded-lg border border-primary/10 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col h-full">
      {/* Image Block */}
      <div className="relative aspect-4/5 bg-secondary overflow-hidden">
        {/* Discount Tag */}
        {product.discount > 0 && (
          <span className="absolute top-3 left-3 z-10 bg-accent text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-xs shadow-xs">
            -{product.discount}%
          </span>
        )}

        {/* Stock Badge */}
        {product.stock <= 0 && (
          <span className="absolute top-3 right-3 z-10 bg-primary/80 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-xs">
            Out of Stock
          </span>
        )}

        <Link href={`/products/${product._id}`} className="block w-full h-full">
          {product.images?.[0] ?
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          : <div className="w-full h-full flex items-center justify-center text-primary/30 text-xs uppercase tracking-widest">
              No Image
            </div>
          }
        </Link>
      </div>

      {/* Details Block */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-primary/50 mb-1">
            <span className="uppercase tracking-widest text-[10px]">
              {product.category?.name || product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500">
              <FiStar className="w-3 h-3 fill-amber-500" />
              <span className="font-medium text-primary">
                {product.rating || "New"}
              </span>
            </div>
          </div>

          <Link href={`/products/${product._id}`}>
            <h3 className="font-semibold text-sm text-primary group-hover:text-accent transition-colors line-clamp-1 mb-1">
              {product.title}
            </h3>
          </Link>

          <p className="text-xs text-primary/60 line-clamp-2 mb-4 font-light">
            {product.description}
          </p>
        </div>

        {/* Footer Info: Price and Colors */}
        <div className="pt-3 border-t border-primary/5 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-primary">
              ${discountedPrice.toFixed(2)}
            </span>
            {product.discount > 0 && (
              <span className="text-xs text-primary/40 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
