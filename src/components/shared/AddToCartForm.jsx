"use client";

import { useAuth } from "@/hooks/useAuth";
import { cartService } from "@/services/cart.service";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiMinus, FiPlus } from "react-icons/fi";

// Helper to map string colors from the DB to hex codes for the UI
const getColorHex = (colorName) => {
  const map = {
    Black: "#000000",
    White: "#FFFFFF",
    Grey: "#808080",
    Blue: "#2563EB",
    Red: "#DC2626",
    Green: "#16A34A",
    Tan: "#D2B48C",
    Navy: "#000080",
    Charcoal: "#333333",
    Olive: "#556B2F",
    Camel: "#C19A6B",
  };
  return map[colorName] || colorName.toLowerCase(); // Fallback to CSS named color
};

export default function AddToCartForm({ product }) {
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
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

    if (product.colors?.length > 0 && !selectedColor) {
      toast.error("Please select a color.");
      return;
    }

    if (product.sizes?.length > 0 && !selectedSize) {
      toast.error("Please select a size.");
      return;
    }

    try {
      setIsLoading(true);

      await cartService.addToCart({
        userId: user._id,
        productId: product._id,
        quantity,
        color: selectedColor,
        size: selectedSize,
      });

      toast.success("Added to cart.");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleAddToCart} className="space-y-8">
      {/* Color Selection (CSS-only interactivity) */}
      {product.colors && product.colors.length > 0 && (
        <div>
          <div className="flex items-center justify-between my-4">
            <span className="text-xs uppercase tracking-widest font-semibold">
              Color
            </span>
          </div>
          <div className="flex items-center gap-4">
            {product.colors.map((colorName) => (
              <label key={colorName} className="cursor-pointer group relative">
                <input
                  type="radio"
                  name="color"
                  value={colorName}
                  checked={selectedColor === colorName}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="peer sr-only"
                />
                <div
                  className="w-8 h-8 rounded-full border border-primary/20 peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary ring-offset-4 ring-offset-secondary transition-all"
                  style={{ backgroundColor: getColorHex(colorName) }}
                />
                {/* Tooltip */}
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-white text-[10px] px-2 py-1 rounded pointer-events-none whitespace-nowrap">
                  {colorName}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Size Selection (CSS-only interactivity) */}
      {product.sizes && product.sizes.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-widest font-semibold">
              Size
            </span>
            <button
              type="button"
              className="text-[10px] uppercase tracking-widest text-primary/50 hover:text-primary transition-colors underline underline-offset-4"
            >
              Size Guide
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {product.sizes.map((size) => (
              <label key={size} className="cursor-pointer">
                <input
                  type="radio"
                  name="size"
                  value={size}
                  checked={selectedSize === size}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="peer sr-only"
                />
                <div className="border border-primary/20 py-3 text-center text-xs tracking-widest uppercase transition-all peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white hover:border-primary/50">
                  {size}
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

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
