import React from "react";
import { FiStar, FiChevronRight, FiMinus, FiPlus } from "react-icons/fi";
import { notFound } from "next/navigation";

// Import your helper function (Adjust the path if your lib folder is located elsewhere)
import { fetchAPI } from "@/lib/api";
import AddToCartForm from "@/components/shared/AddToCartForm";
import Link from "next/link";

const ProductDetails = async ({ params }) => {
  // Await params as required in Next.js 15+
  const { slug } = await params;

  let product = null;

  try {
    // Fetch product data dynamically
    // Assuming your backend supports fetching by slug via /products/[slug]
    const res = await fetchAPI(`/api/products/${slug}`);
    product = res?.data || res;
  } catch (error) {
    console.error("Failed to fetch product:", error);
  }

  // If no product is found, trigger Next.js 404 page
  if (!product) {
    notFound();
  }

  // Calculate pricing
  const hasDiscount = product.discount > 0;
  const finalPrice =
    hasDiscount ? product.price * (1 - product.discount / 100) : product.price;

  // Use a fallback main image if array is empty
  const mainImage = product.images?.[0] || "/placeholder.jpg";

  return (
    <div className="bg-secondary min-h-screen text-primary selection:bg-accent selection:text-white pb-24">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary/50">
          <span className="hover:text-primary cursor-pointer transition-colors">
            Home
          </span>
          <FiChevronRight className="w-3 h-3" />
          <span className="hover:text-primary cursor-pointer transition-colors">
            {product.category}
          </span>
          <FiChevronRight className="w-3 h-3" />
          <span className="text-primary font-medium">{product.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Asymmetrical Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Left Column: Image Gallery (Spans 7 columns) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 h-fit  top-8">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 w-full md:w-24 flex-shrink-0">
              {product.images?.map((img, idx) => (
                <div
                  key={idx}
                  className="w-full aspect-[3/4] bg-white border border-primary/10 relative cursor-pointer hover:border-primary/40 transition-colors flex items-center justify-center overflow-hidden"
                >
                  <img
                    src={img}
                    alt={`${product.title} view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-grow aspect-[3/4] bg-white border border-primary/10 flex items-center justify-center relative overflow-hidden">
              <img
                src={mainImage}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isFeatured && (
                  <span className="bg-primary text-white text-[10px] uppercase tracking-widest px-3 py-1">
                    Featured
                  </span>
                )}
                {hasDiscount && (
                  <span className="bg-accent text-white text-[10px] uppercase tracking-widest px-3 py-1">
                    {product.discount}% Off
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Product Details (Spans 5 columns) */}
          <div className="lg:col-span-5 flex flex-col pt-4 lg:pt-8">
            {/* Title & Rating */}
            <div className="mb-6">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 leading-tight">
                {product.title}
              </h1>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-2xl font-medium tracking-tight">
                ৳{finalPrice.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-lg text-primary/40 line-through tracking-tight">
                  ৳{product.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-primary/70 font-light leading-relaxed mb-8">
              {product.description}
            </p>

            <hr className="border-primary/10 mb-8" />

            <AddToCartForm product={product} />

            <hr className="border-primary/10 my-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
