import React from "react";
import { FiShoppingCart, FiHeart, FiStar } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
const ProductCard = ({ product, finalPrice }) => {
  return (
    <div key={product._id} className="group flex flex-col">
      {/* Image Wrapper */}
      <div className="relative w-full aspect-[4/5] bg-gray-200 rounded-md overflow-hidden mb-5">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
          {product.discount > 0 && (
            <span className="bg-accent text-white text-[10px] font-bold uppercase tracking-wider py-1 px-2 rounded-sm shadow-sm">
              -{product.discount}%
            </span>
          )}
          {product.stock < 10 && product.stock > 0 && (
            <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-wider py-1 px-2 rounded-sm shadow-sm">
              Low Stock
            </span>
          )}
        </div>

        <Link
          href={`/products/${product._id}`}
          className="absolute inset-0 z-10"
        >
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center transform transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
        </Link>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow">
        {/* Category & Rating */}
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-primary/60 font-medium uppercase tracking-wider">
            {product.category?.name || product.category}
          </span>
          <div className="flex items-center gap-1">
            <FiStar className="w-3.5 h-3.5 text-accent fill-accent" />
            <span className="text-xs font-semibold text-primary/80">
              {product.rating}{" "}
              <span className="text-primary/50 font-normal">
                ({product.numReviews})
              </span>
            </span>
          </div>
        </div>

        {/* Title */}
        <Link
          href={`/products/${product._id}`}
          className="group-hover:text-accent transition-colors"
        >
          <h3 className="text-base font-bold text-primary truncate mb-1">
            {product.title}
          </h3>
        </Link>

        {/* Pricing */}
        <div className="mt-auto flex items-center gap-2">
          <span className="text-base font-bold text-primary">
            ৳{finalPrice.toFixed(2)}
          </span>
          {product.discount > 0 && (
            <span className="text-sm font-medium text-primary/40 line-through decoration-primary/40">
              ৳{product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
