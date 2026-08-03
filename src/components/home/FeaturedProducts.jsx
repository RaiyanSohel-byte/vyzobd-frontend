// components/home/FeaturedProducts.tsx

import Link from "next/link";
import ProductCard from "../shared/ProductCard";
import { getProducts } from "@/lib/api";

export default async function FeaturedProducts() {
  let featuredProducts = [];

  try {
    // Fetch actual data from your Next.js backend
    const productsRes = await getProducts();
    const allProducts = productsRes?.data || productsRes || [];

    // Filter for featured products (limiting to 4 to perfectly fit the lg:grid-cols-4 layout)
    featuredProducts = allProducts
      .filter((product) => product.isFeatured)
      .slice(0, 4);
  } catch (error) {
    console.error("Failed to fetch featured products:", error);
  }

  return (
    <section className="py-20 md:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16">
          <div className="max-w-2xl">
            <span className="block text-accent font-semibold text-xs md:text-sm uppercase tracking-[0.2em] mb-3">
              Curated Selection
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary tracking-tight">
              Featured Arrivals
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden md:inline-flex items-center text-sm font-semibold text-primary hover:text-accent uppercase tracking-wider transition-colors border-b-2 border-transparent hover:border-accent pb-1"
          >
            View All
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {featuredProducts.length > 0 ?
            featuredProducts.map((product) => {
              // Calculate discounted price
              const finalPrice =
                product.discount > 0 ?
                  product.price - product.price * (product.discount / 100)
                : product.price;

              return (
                <ProductCard
                  key={product._id || product.slug}
                  product={product}
                  finalPrice={finalPrice}
                />
              );
            })
          : <div className="col-span-full text-center text-primary/60 py-10">
              No featured products available at the moment.
            </div>
          }
        </div>

        {/* Mobile View All Button */}
        <div className="mt-10 flex justify-center md:hidden">
          <Link
            href="/products"
            className="inline-flex items-center justify-center w-full border border-primary text-primary hover:bg-primary hover:text-white text-sm font-bold uppercase tracking-wider py-4 rounded-md transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
