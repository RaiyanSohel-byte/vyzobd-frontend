"use client";

import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { cartService } from "@/services/cart.service";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiMinus, FiPlus } from "react-icons/fi";

export default function AddToCartForm({ product }) {
  const { user } = useAuth();
  const { setCartCount } = useCart();
  const [quantity, setQuantity] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncrement = () => {
    setQuantity((prev) => (prev < product.stock ? prev + 1 : prev));
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login first.");
      return;
    }

    try {
      setIsLoading(true);

      await cartService.addToCart({
        userId: user._id,
        productId: product._id,
        quantity,
      });
      setCartCount((prev) => prev + 1);
      toast.success("Added to cart.");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleAddToCart} className="space-y-8">
      {/* Stock Indicator */}
      <div className="flex items-center gap-2 pt-2">
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            product.stock > 0 ? "bg-emerald-500" : "bg-accent"
          }`}
        />
        <span className="text-xs tracking-widest text-primary/60">
          {product.stock > 0 ?
            `${product.stock} in stock - Ready to ship`
          : "Currently out of stock"}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-4">
        {/* Quantity */}
        <div className="flex items-center justify-between border border-primary/20 px-4 py-4 w-32">
          <button
            type="button"
            onClick={handleDecrement}
            className="text-primary/50 hover:text-primary transition-colors cursor-pointer"
          >
            <FiMinus className="w-3 h-3" />
          </button>

          <span className="text-sm font-medium">{quantity}</span>
          {/* Hidden input ensures the quantity value is submitted with the form */}
          <input type="hidden" name="quantity" value={quantity} />

          <button
            type="button"
            onClick={handleIncrement}
            className="text-primary/50 hover:text-primary transition-colors cursor-pointer"
          >
            <FiPlus className="w-3 h-3" />
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={product.stock <= 0 || isLoading}
          className="cursor-pointer flex-grow bg-accent font-semibold text-secondary text-sm uppercase tracking-widest py-4 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ?
            "Adding..."
          : product.stock > 0 ?
            "Add to Cart"
          : "Sold Out"}
        </button>
      </div>
    </form>
  );
}
