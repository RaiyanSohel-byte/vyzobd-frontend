"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMinus, FiPlus, FiX, FiArrowRight, FiLock } from "react-icons/fi";

// --- Mock Data ---
const INITIAL_CART = [
  {
    _id: "cart-1",
    productId: "1",
    title: "Architectural Wool Overcoat",
    slug: "architectural-wool-overcoat",
    price: 320,
    discount: 15, // 15% off
    image: "/placeholder.jpg",
    selectedSize: "M",
    selectedColor: { name: "Charcoal", hex: "#333333" },
    quantity: 1,
    stock: 12,
  },
  {
    _id: "cart-2",
    productId: "3",
    title: "Heavyweight Boxy Tee",
    slug: "heavyweight-boxy-tee",
    price: 65,
    discount: 0,
    image: "/placeholder.jpg",
    selectedSize: "L",
    selectedColor: { name: "Olive", hex: "#556B2F" },
    quantity: 2,
    stock: 45,
  },
];

export default function CartSection() {
  const [cartItems, setCartItems] = useState(INITIAL_CART);

  // Handlers
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item._id === id ?
          { ...item, quantity: Math.min(newQuantity, item.stock) }
        : item,
      ),
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item._id !== id));
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => {
    const finalPrice = item.price * (1 - (item.discount || 0) / 100);
    return acc + finalPrice * item.quantity;
  }, 0);

  const shipping = subtotal > 200 ? 0 : 15; // Free shipping over $200
  const tax = subtotal * 0.08; // 8% tax rate estimation
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <section className="bg-secondary text-primary py-20 lg:py-32 min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-4">
            Your bag is empty.
          </h1>
          <p className="text-primary/60 font-light mb-8">
            Discover our latest architectural silhouettes and essentials.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 bg-primary text-white text-sm font-medium px-8 py-3.5 rounded-md hover:bg-primary/90 transition-all shadow-sm group"
          >
            Continue Shopping
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-secondary text-primary py-12 lg:py-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 border-b border-primary/10 pb-6">
          <span className="inline-block text-accent text-xs font-bold uppercase tracking-[0.2em] mb-4">
            Shopping Bag
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Review your selection.
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Cart Items */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {cartItems.map((item) => {
              const itemFinalPrice =
                item.price * (1 - (item.discount || 0) / 100);

              return (
                <div
                  key={item._id}
                  className="bg-white p-4 sm:p-6 rounded-lg border border-primary/5 shadow-xs flex flex-col sm:flex-row gap-6 relative"
                >
                  {/* Remove Button (Mobile: Top Right, Desktop: Absolute Right) */}
                  <button
                    onClick={() => removeItem(item._id)}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 text-primary/40 hover:text-accent transition-colors"
                    aria-label="Remove item"
                  >
                    <FiX className="w-5 h-5" />
                  </button>

                  {/* Image */}
                  <Link
                    href={`/products/${item.slug}`}
                    className="block flex-shrink-0 w-24 h-32 sm:w-32 sm:h-40 bg-secondary rounded-md relative overflow-hidden"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex flex-col flex-1 justify-between">
                    <div className="pr-8">
                      <Link href={`/products/${item.slug}`}>
                        <h3 className="text-base font-semibold hover:text-accent transition-colors line-clamp-1 mb-1">
                          {item.title}
                        </h3>
                      </Link>

                      {/* Price Block */}
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-sm font-bold">
                          ${itemFinalPrice.toFixed(2)}
                        </span>
                        {item.discount > 0 && (
                          <span className="text-xs text-primary/40 line-through">
                            ${item.price.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* Size & Color Variations */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-primary/70 font-light mb-6">
                        <p>
                          <span className="font-medium text-primary">
                            Size:
                          </span>{" "}
                          {item.selectedSize}
                        </p>
                        <div className="w-px h-3 bg-primary/20 hidden sm:block"></div>
                        <p className="flex items-center gap-1.5">
                          <span className="font-medium text-primary">
                            Color:
                          </span>
                          <span
                            className="w-3 h-3 rounded-full border border-primary/20 inline-block"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          {item.selectedColor.name}
                        </p>
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary/50">
                        Qty
                      </span>
                      <div className="flex items-center bg-secondary rounded-md border border-primary/10 w-24">
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity - 1)
                          }
                          className="flex-1 flex items-center justify-center py-2 text-primary/60 hover:text-primary transition-colors disabled:opacity-50"
                          disabled={item.quantity <= 1}
                        >
                          <FiMinus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity + 1)
                          }
                          className="flex-1 flex items-center justify-center py-2 text-primary/60 hover:text-primary transition-colors disabled:opacity-50"
                          disabled={item.quantity >= item.stock}
                        >
                          <FiPlus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-6">
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-primary/10 shadow-sm">
              <h2 className="text-lg font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 text-sm font-light text-primary/80 mb-6 pb-6 border-b border-primary/10">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="font-medium text-primary">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Shipping</span>
                  <span className="font-medium text-primary">
                    {shipping === 0 ?
                      "Complimentary"
                    : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Estimated Tax</span>
                  <span className="font-medium text-primary">
                    ${tax.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-base font-bold">Total</span>
                <span className="text-xl font-bold">${total.toFixed(2)}</span>
              </div>

              <button className="w-full bg-accent text-white text-sm font-bold px-8 py-4 rounded-md hover:bg-primary/90 transition-all shadow-sm flex items-center justify-center gap-2 group mb-4">
                Order
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-primary/50">
                <FiLock className="w-3 h-3" />
                <span>Secure SSL Encrypted Checkout</span>
              </div>
            </div>

            {/* Optional Promotional Block */}
            <div className="mt-6 bg-transparent border border-primary/10 rounded-lg p-6">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-2">
                Need Assistance?
              </h3>
              <p className="text-xs text-primary/60 leading-relaxed mb-4">
                Our advisors are available to help with sizing, styling, and any
                order inquiries.
              </p>
              <Link
                href="/contact"
                className="text-xs font-semibold text-accent hover:underline"
              >
                Contact Client Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
