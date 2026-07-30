// components/home/FeaturedProducts.tsx

import Link from "next/link";

import ProductCard from "../shared/ProductCard";

// 2. Mock Data (Replace with your actual fetch from your Next.js backend)
const FEATURED_PRODUCTS = [
  {
    _id: "65f1a1",
    title: "Structured Wool Overcoat",
    slug: "structured-wool-overcoat",
    description:
      "A premium Italian wool overcoat with a tailored, modern silhouette.",
    price: 350,
    discount: 0,
    category: "Men",
    images: [
      "https://images.unsplash.com/photo-1520975954732-57dd22299614?q=80&w=1888&auto=format&fit=crop",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Camel"],
    stock: 15,
    rating: 4.8,
    numReviews: 124,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "65f1a2",
    title: "Minimalist Leather Tote",
    slug: "minimalist-leather-tote",
    description:
      "Handcrafted full-grain leather tote perfect for daily essentials.",
    price: 180,
    discount: 15, // 15% off
    category: "Accessories",
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1938&auto=format&fit=crop",
    ],
    sizes: ["One Size"],
    colors: ["Tan"],
    stock: 8,
    rating: 4.9,
    numReviews: 89,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "65f1a3",
    title: "Heavyweight Cotton Tee",
    slug: "heavyweight-cotton-tee",
    description:
      "The ultimate foundational piece. Boxy fit, heavyweight organic cotton.",
    price: 45,
    discount: 0,
    category: "Unisex",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Olive"],
    stock: 120,
    rating: 4.6,
    numReviews: 312,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "65f1a4",
    title: "Pleated Wide-Leg Trousers",
    slug: "pleated-wide-leg-trousers",
    description:
      "Relaxed fit pleated trousers designed for movement and elegance.",
    price: 120,
    discount: 30, // 30% off
    category: "Women",
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976&auto=format&fit=crop",
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Charcoal", "Navy"],
    stock: 22,
    rating: 4.7,
    numReviews: 56,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function FeaturedProducts() {
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
          {FEATURED_PRODUCTS.map((product) => {
            // Calculate discounted price
            const finalPrice =
              product.discount > 0 ?
                product.price - product.price * (product.discount / 100)
              : product.price;

            return (
              <ProductCard
                key={product._id}
                product={product}
                finalPrice={finalPrice}
              />
            );
          })}
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
