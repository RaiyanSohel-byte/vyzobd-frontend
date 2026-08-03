"use client";

import { useEffect, useState, useCallback, useMemo, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiMinus,
  FiPlus,
  FiX,
  FiArrowRight,
  FiLock,
  FiAlertCircle,
  FiRefreshCw,
} from "react-icons/fi";
import { cartService } from "@/services/cart.service";
import toast from "react-hot-toast";
import { useCart } from "@/hooks/useCart";

// Extracted into a memoized component to prevent re-rendering all items when one updates
const CartItemCard = memo(({ item, isUpdating, onUpdate, onRemove }) => {
  const [imgError, setImgError] = useState(false);

  const product = item?.product;
  if (!product) return null;

  // Fixed mapping: uses item.quantity instead of item.product.quantity
  const quantity = item?.quantity || 1;
  const itemFinalPrice =
    (product.price || 0) * (1 - (product.discount || 0) / 100);

  // Safe image fallback
  const fallbackImg =
    "https://placehold.co/300x400/eeeeee/999999?text=No+Image";
  const imgSrc =
    !imgError && product.images?.[0] ? product.images[0] : fallbackImg;

  return (
    <div
      className={`bg-white p-4 sm:p-6 rounded-lg border border-primary/5 shadow-xs flex flex-col sm:flex-row gap-6 relative transition-opacity duration-300 ${
        isUpdating ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      {/* Remove Button */}
      <button
        onClick={() =>
          onRemove({
            productId: product._id,
          })
        }
        disabled={isUpdating}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 text-primary/40 hover:text-accent transition-colors disabled:opacity-50"
        aria-label={`Remove ${product.title || "item"} from cart`}
      >
        <FiX className="w-5 h-5" />
      </button>

      {/* Image */}
      <Link
        href={`/products/${product.slug || ""}`}
        className="block flex-shrink-0 w-24 h-32 sm:w-32 sm:h-40 bg-secondary rounded-md relative overflow-hidden"
      >
        <Image
          src={imgSrc}
          alt={product.title || "Product Image"}
          fill
          sizes="(max-width: 640px) 96px, 128px"
          onError={() => setImgError(true)}
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
      </Link>

      {/* Details */}
      <div className="flex flex-col flex-1 justify-between">
        <div className="pr-8">
          <Link href={`/products/${product.slug || ""}`}>
            <h3 className="text-base font-semibold hover:text-accent transition-colors line-clamp-1 mb-1">
              {product.title || "Untitled Product"}
            </h3>
          </Link>

          {/* Price Block */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-sm font-bold">
              ${itemFinalPrice.toFixed(2)}
            </span>
            {(product.discount || 0) > 0 && (
              <span className="text-xs text-primary/40 line-through">
                ${(product.price || 0).toFixed(2)}
              </span>
            )}
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
                onUpdate(
                  {
                    productId: product._id,
                  },
                  quantity + 1,
                  quantity,
                )
              }
              className="flex-1 flex items-center justify-center py-2 text-primary/60 hover:text-primary transition-colors disabled:opacity-50"
              disabled={quantity <= 1 || isUpdating}
              aria-label="Decrease quantity"
            >
              <FiMinus className="w-3 h-3" />
            </button>
            <span
              className="text-sm font-medium w-6 text-center"
              aria-live="polite"
            >
              {quantity}
            </span>
            <button
              onClick={() => onUpdate(product._id, quantity + 1, quantity)}
              className="flex-1 flex items-center justify-center py-2 text-primary/60 hover:text-primary transition-colors disabled:opacity-50"
              disabled={quantity >= (product.stock || Infinity) || isUpdating}
              aria-label="Increase quantity"
            >
              <FiPlus className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
CartItemCard.displayName = "CartItemCard";

export default function CartSection() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setCartCount } = useCart();
  // Shipping zone state (insideDhaka or outsideDhaka)
  const [shippingZone, setShippingZone] = useState("insideDhaka");

  // Track individual item loading states for optimistic updates
  const [updatingItems, setUpdatingItems] = useState(new Set());

  const fetchCart = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await cartService.getCart();
      setCartItems(data?.data?.items || []);
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to load cart.";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Optimistic UI Update: Fast quantity mapping without full refetch
  const updateQuantity = useCallback(
    async ({ productId }, newQuantity, currentQuantity) => {
      if (newQuantity < 1) return;

      setCartItems((prev) =>
        prev.map((item) =>
          item?.product?._id === productId ?
            { ...item, quantity: newQuantity }
          : item,
        ),
      );
      setUpdatingItems((prev) => new Set(prev).add(productId));

      try {
        await cartService.updateCart({
          productId,

          quantity: newQuantity,
        });
        // Success: No need to refetch, UI is already updated
      } catch (err) {
        // Revert to old quantity on error
        setCartItems((prev) =>
          prev.map((item) =>
            item?.product?._id === productId ?
              { ...item, quantity: currentQuantity }
            : item,
          ),
        );
        toast.error(
          err?.response?.data?.message || "Failed to update quantity.",
        );
      } finally {
        setUpdatingItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
      }
    },
    [],
  );

  // Optimistic UI Remove
  const removeItem = useCallback(
    async ({ productId }) => {
      const previousItems = [...cartItems];

      setCartItems((prev) =>
        prev.filter((item) => !(item.product._id === productId)),
      );
      setUpdatingItems((prev) => new Set(prev).add(productId));

      try {
        await cartService.removeItem({
          productId,
        });
        toast.success("Item removed from cart");
      } catch (err) {
        setCartItems(previousItems); // Revert
        toast.error(err?.response?.data?.message || "Failed to remove item.");
      } finally {
        setUpdatingItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
      }
    },
    [cartItems],
  );

  // Memoized Calculations
  const { subtotal, shippingCost, total } = useMemo(() => {
    const sub = cartItems.reduce((acc, item) => {
      const price = item?.product?.price || 0;
      const discount = item?.product?.discount || 0;
      const finalPrice = price * (1 - discount / 100);
      return acc + finalPrice * (item?.quantity || 1);
    }, 0);

    // Shipping cost logic based on selected zone (Free if cart is empty)
    const shipping =
      sub === 0 ? 0
      : shippingZone === "insideDhaka" ? 80
      : 130;
    const tot = sub + shipping;

    return { subtotal: sub, shippingCost: shipping, total: tot };
  }, [cartItems, shippingZone]);

  useEffect(() => {
    setCartCount(cartItems.length);
  }, [cartItems, setCartCount]);

  // ================= State Returns ================= //

  if (error) {
    return (
      <section className="bg-secondary text-primary py-20 lg:py-32 min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <FiAlertCircle className="w-12 h-12 mx-auto text-primary/40 mb-4" />
          <h1 className="text-3xl font-bold tracking-tight mb-4">
            Something went wrong.
          </h1>
          <p className="text-primary/60 font-light mb-8">{error}</p>
          <button
            onClick={fetchCart}
            className="inline-flex items-center justify-center gap-2 bg-accent font-semibold text-white text-sm px-8 py-3.5 rounded-md hover:bg-primary/90 transition-all shadow-sm group"
          >
            <FiRefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            Try Again
          </button>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="bg-secondary text-primary py-12 lg:py-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 border-b border-primary/10 pb-6">
            <div className="h-3 w-32 bg-primary/10 rounded mb-4 animate-pulse"></div>
            <div className="h-10 w-64 bg-primary/10 rounded animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="bg-white p-4 sm:p-6 rounded-lg border border-primary/5 shadow-xs flex flex-col sm:flex-row gap-6 animate-pulse"
                >
                  <div className="w-24 h-32 sm:w-32 sm:h-40 bg-primary/5 rounded-md"></div>
                  <div className="flex flex-col flex-1 justify-between py-2">
                    <div className="space-y-3">
                      <div className="h-5 w-3/4 bg-primary/5 rounded"></div>
                      <div className="h-4 w-1/4 bg-primary/5 rounded"></div>
                      <div className="h-4 w-1/2 bg-primary/5 rounded mt-4"></div>
                    </div>
                    <div className="h-8 w-24 bg-primary/5 rounded mt-6"></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-5 xl:col-span-4 sticky top-6">
              <div className="bg-white p-6 sm:p-8 rounded-lg border border-primary/10 shadow-sm animate-pulse">
                <div className="h-6 w-1/3 bg-primary/10 rounded mb-6"></div>
                <div className="space-y-4 mb-6 pb-6 border-b border-primary/10">
                  <div className="flex justify-between">
                    <div className="h-4 w-1/4 bg-primary/5 rounded"></div>
                    <div className="h-4 w-1/4 bg-primary/5 rounded"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="h-4 w-1/4 bg-primary/5 rounded"></div>
                    <div className="h-4 w-1/4 bg-primary/5 rounded"></div>
                  </div>
                </div>
                <div className="flex justify-between mb-8">
                  <div className="h-6 w-1/4 bg-primary/10 rounded"></div>
                  <div className="h-6 w-1/4 bg-primary/10 rounded"></div>
                </div>
                <div className="h-14 w-full bg-primary/10 rounded-md mb-4"></div>
                <div className="h-3 w-1/2 mx-auto bg-primary/5 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
            className="inline-flex items-center justify-center gap-2 bg-accent font-semibold text-white text-sm px-8 py-3.5 rounded-md hover:bg-primary/90 transition-all shadow-sm group"
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
            {cartItems.map((item) => (
              <CartItemCard
                key={item?._id}
                item={item}
                isUpdating={updatingItems.has(item?.product?._id)}
                onUpdate={updateQuantity}
                onRemove={removeItem}
              />
            ))}
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

                {/* Shipping Location Options */}
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary/60 block mb-2">
                    Shipping Option
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setShippingZone("insideDhaka")}
                      className={`py-2 px-3 text-xs font-medium rounded-md border text-center transition-all ${
                        shippingZone === "insideDhaka" ?
                          "border-accent bg-accent/5 text-accent font-semibold"
                        : "border-primary/10 hover:border-primary/30 text-primary/70"
                      }`}
                    >
                      Inside Dhaka
                      <span className="block text-[16px] font-bold ">
                        $80.00
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShippingZone("outsideDhaka")}
                      className={`py-2 px-3 text-xs font-medium rounded-md border text-center transition-all ${
                        shippingZone === "outsideDhaka" ?
                          "border-accent bg-accent/5 text-accent font-semibold"
                        : "border-primary/10 hover:border-primary/30 text-primary/70"
                      }`}
                    >
                      Outside Dhaka
                      <span className="block text-[16px] font-bold">
                        $130.00
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span>Shipping Cost</span>
                  <span className="font-medium text-primary">
                    ${shippingCost.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-base font-bold">Total</span>
                <span className="text-xl font-bold">${total.toFixed(2)}</span>
              </div>

              <Link href={"/checkout"}>
                {" "}
                <button className="w-full bg-accent text-white text-sm font-bold px-8 py-4 rounded-md hover:bg-primary/90 transition-all shadow-sm flex items-center justify-center gap-2 group mb-4 cursor-pointer">
                  Proceed to Checkout
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
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
