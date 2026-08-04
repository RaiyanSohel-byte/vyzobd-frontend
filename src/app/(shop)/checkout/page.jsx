"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FiMapPin,
  FiBox,
  FiCreditCard,
  FiCheck,
  FiLock,
  FiChevronDown,
  FiPlus,
  FiMinus,
  FiTrash2,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { cartService } from "@/services/cart.service";
import { orderService } from "@/services/order.service";

// Bangladesh Locations Data
const bangladeshLocations = {
  Dhaka: [
    "Dhaka",
    "Faridpur",
    "Gazipur",
    "Gopalganj",
    "Kishoreganj",
    "Madaripur",
    "Manikganj",
    "Munshiganj",
    "Narayanganj",
    "Narsingdi",
    "Rajbari",
    "Shariatpur",
    "Tangail",
  ],
  Chattogram: [
    "Bandarban",
    "Brahmanbaria",
    "Chandpur",
    "Chattogram",
    "Cumilla",
    "Cox's Bazar",
    "Feni",
    "Khagrachari",
    "Lakshmipur",
    "Noakhali",
    "Rangamati",
  ],
  Rajshahi: [
    "Bogura",
    "Joypurhat",
    "Naogaon",
    "Natore",
    "Chapainawabganj",
    "Pabna",
    "Rajshahi",
    "Sirajganj",
  ],
  Khulna: [
    "Bagerhat",
    "Chuadanga",
    "Jashore",
    "Jhenaidah",
    "Khulna",
    "Kushtia",
    "Magura",
    "Meherpur",
    "Narail",
    "Satkhira",
  ],
  Barishal: [
    "Barguna",
    "Barishal",
    "Bhola",
    "Jhalokati",
    "Patuakhali",
    "Pirojpur",
  ],
  Sylhet: ["Habiganj", "Moulvibazar", "Sunamganj", "Sylhet"],
  Rangpur: [
    "Dinajpur",
    "Gaibandha",
    "Kurigram",
    "Lalmonirhat",
    "Nilphamari",
    "Panchagarh",
    "Rangpur",
    "Thakurgaon",
  ],
  Mymensingh: ["Jamalpur", "Mymensingh", "Netrokona", "Sherpur"],
};

export default function CheckoutPage() {
  const router = useRouter(); // Initialize router for redirection
  const [cartItems, setCartItems] = useState([]);
  const [isLoadingCart, setIsLoadingCart] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    division: "Dhaka",
    city: "Dhaka", // Represents the District, mapping to your schema's 'city'
    postalCode: "",
    country: "Bangladesh",
  });

  const fetchCart = async () => {
    try {
      const { data } = await cartService.getCart();
      setCartItems(data.data.items || []);
    } catch (err) {
      console.error(err);
      console.log(err.response?.data);
      toast.error(err.response?.data?.message || "Failed to load cart");
    } finally {
      setIsLoadingCart(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // If division changes, automatically reset the district (city) to the first item in that division
    if (name === "division") {
      setFormData((prev) => ({
        ...prev,
        division: value,
        city: bangladeshLocations[value][0],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // UX Functions for Cart Modification
  const handleUpdateQuantity = async (item, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      await cartService.updateCart({
        productId: item.product._id,
        quantity: newQuantity,
      });

      await fetchCart();
      toast.success("Cart updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update cart");
    }
  };

  const handleRemoveItem = async (item) => {
    try {
      await cartService.removeItem({
        productId: item.product._id,
      });
      await fetchCart();

      toast.success("Item removed");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to remove item");
    }
  };

  // Calculations matching Mongoose schema fields
  const { subtotal, shippingCost, discount, total } = useMemo(() => {
    const sub = cartItems.reduce((acc, item) => {
      const price = item.product.price;
      const itemDiscount = item.product.discount || 0;

      const finalPrice = price * (1 - itemDiscount / 100);

      return acc + finalPrice * item.quantity;
    }, 0);

    const shipping = formData.city === "Dhaka" ? 80 : 130;
    const disc = 0;

    return {
      subtotal: sub,
      shippingCost: shipping,
      discount: disc,
      total: sub + shipping - disc,
    };
  }, [cartItems, formData.city]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validate the request
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("Please fill in all required shipping fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { division, ...shippingAddress } = formData;

      const items = cartItems.map((item) => ({
        product: item.product._id,
        title: item.product.title,
        image: item.product.images[0],
        price: item.product.price,
        quantity: item.quantity,
      }));

      const orderPayload = {
        items,
        shippingAddress,
        subtotal,
        shippingCost,
        discount,
        total,
        paymentMethod: "Cash On Delivery",
      };

      // 2. Create the order
      const response = await orderService.createOrder(orderPayload);
      toast.success("Order placed successfully!");

      // 3. Clear the user's cart
      await cartService.clearCart();

      // 4. Redirect the user to success page
      // Extracting the created order ID (adjust depending on your exact API response structure)
      const createdOrderId = response?.data?.data?._id || response?.data?._id;

      if (createdOrderId) {
        router.push(`/order-success?orderId=${createdOrderId}`);
      } else {
        router.push("/order-success");
      }
    } catch (err) {
      console.log(err.response?.data);
      toast.error(err.response?.data?.message || "Failed to place order");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-secondary min-h-screen text-primary selection:bg-accent selection:text-white pb-24 pt-12 lg:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 border-b border-primary/10 pb-6">
          <span className="inline-block text-accent text-xs font-bold uppercase tracking-[0.2em] mb-4">
            Secure Checkout
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Complete your order.
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Left Column: Form Details */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-10">
            <section className="bg-white p-6 sm:p-8 rounded-lg border border-primary/5 shadow-sm">
              <div className="flex items-center gap-3 mb-6 border-b border-primary/10 pb-4">
                <FiMapPin className="w-5 h-5 text-accent" />
                <h2 className="text-lg font-bold tracking-tight">
                  Shipping Address
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="block text-xs uppercase tracking-widest font-semibold text-primary/70 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-secondary border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary rounded-md px-4 py-3 text-sm transition-all outline-none"
                    placeholder="Jane Doe"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="phone"
                    className="block text-xs uppercase tracking-widest font-semibold text-primary/70 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-secondary border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary rounded-md px-4 py-3 text-sm transition-all outline-none"
                    placeholder="+880 1XXXXXXXXX"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="block text-xs uppercase tracking-widest font-semibold text-primary/70 mb-2"
                  >
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-secondary border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary rounded-md px-4 py-3 text-sm transition-all outline-none"
                    placeholder="House/Apartment, Street Name"
                  />
                </div>

                {/* Division Dropdown */}
                <div className="relative">
                  <label
                    htmlFor="division"
                    className="block text-xs uppercase tracking-widest font-semibold text-primary/70 mb-2"
                  >
                    Division
                  </label>
                  <div className="relative">
                    <select
                      id="division"
                      name="division"
                      required
                      value={formData.division}
                      onChange={handleInputChange}
                      className="w-full appearance-none bg-secondary border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary rounded-md px-4 py-3 text-sm transition-all outline-none cursor-pointer"
                    >
                      {Object.keys(bangladeshLocations).map((div) => (
                        <option key={div} value={div}>
                          {div}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/50 pointer-events-none" />
                  </div>
                </div>

                {/* District Dropdown (maps to City in DB) */}
                <div className="relative">
                  <label
                    htmlFor="city"
                    className="block text-xs uppercase tracking-widest font-semibold text-primary/70 mb-2"
                  >
                    District / City
                  </label>
                  <div className="relative">
                    <select
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full appearance-none bg-secondary border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary rounded-md px-4 py-3 text-sm transition-all outline-none cursor-pointer"
                    >
                      {bangladeshLocations[formData.division].map((dist) => (
                        <option key={dist} value={dist}>
                          {dist}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/50 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="postalCode"
                    className="block text-xs uppercase tracking-widest font-semibold text-primary/70 mb-2"
                  >
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full bg-secondary border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary rounded-md px-4 py-3 text-sm transition-all outline-none"
                    placeholder="1205"
                  />
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-xs uppercase tracking-widest font-semibold text-primary/70 mb-2"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    required
                    readOnly
                    value={formData.country}
                    className="w-full bg-secondary border border-primary/20 rounded-md px-4 py-3 text-sm outline-none opacity-70 cursor-not-allowed"
                  />
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className="bg-white p-6 sm:p-8 rounded-lg border border-primary/5 shadow-sm">
              <div className="flex items-center gap-3 mb-6 border-b border-primary/10 pb-4">
                <FiCreditCard className="w-5 h-5 text-accent" />
                <h2 className="text-lg font-bold tracking-tight">
                  Payment Method
                </h2>
              </div>

              <div className="border border-primary rounded-md p-4 flex items-center justify-between bg-primary/5 cursor-default">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <FiCheck className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold">
                      Cash On Delivery
                    </span>
                    <span className="block text-xs text-primary/60 mt-0.5">
                      Pay with cash upon delivery.
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-6">
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-primary/10 shadow-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-primary/10">
                <FiBox className="w-5 h-5 text-accent" />
                <h2 className="text-lg font-bold">Order Summary</h2>
              </div>

              {/* Items List */}
              <div className="space-y-4 mb-6 pb-6 border-b border-primary/10">
                {cartItems.length === 0 && (
                  <p className="text-sm text-primary/60 italic">
                    Your cart is empty.
                  </p>
                )}
                {cartItems.map((item) => (
                  <div key={item._id} className="flex gap-4 items-center">
                    <div className="relative w-16 h-20 bg-secondary rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold line-clamp-1">
                        {item.product.title}
                      </h3>

                      {/* Quantity & Remove Controls */}
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-primary/20 rounded-md bg-secondary">
                          <button
                            type="button"
                            onClick={() =>
                              handleUpdateQuantity(item, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="p-1 text-primary/70 hover:bg-primary/5 hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <FiMinus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-medium px-2 min-w-[1.5rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handleUpdateQuantity(item, item.quantity + 1)
                            }
                            className="p-1 text-primary/70 hover:bg-primary/5 hover:text-primary transition-colors"
                          >
                            <FiPlus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item)}
                          className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors"
                        >
                          <FiTrash2 className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                    <div className="text-sm font-bold">
                      ৳{(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-4 text-sm font-light text-primary/80 mb-6 pb-6 border-b border-primary/10">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="font-medium text-primary">
                    ৳{subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="space-y-2 pt-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary/60 block mb-1">
                    Shipping Region
                  </span>
                  <div className="text-sm font-medium text-primary bg-primary/5 px-4 py-3 rounded-md border border-primary/10 flex justify-between items-center">
                    <span>
                      {formData.city === "Dhaka" ?
                        "Inside Dhaka"
                      : "Outside Dhaka"}
                    </span>
                    <span className="text-xs opacity-70">
                      ৳{shippingCost.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span>Shipping Cost</span>
                  <span className="font-medium text-primary">
                    ৳{shippingCost.toFixed(2)}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between items-center text-accent">
                    <span>Discount</span>
                    <span className="font-medium">-৳{discount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-base font-bold">Total</span>
                <span className="text-2xl font-bold">৳{total.toFixed(2)}</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || cartItems.length === 0}
                className="w-full bg-accent text-white text-sm font-bold uppercase tracking-widest px-8 py-4 rounded-md hover:bg-primary/90 transition-all shadow-sm flex items-center justify-center gap-2 group mb-4 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ?
                  <span className="animate-pulse">Processing...</span>
                : <>
                    Place Order
                    <FiCheck className="w-4 h-4" />
                  </>
                }
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-primary/50">
                <FiLock className="w-3 h-3" />
                <span>Your information is securely encrypted.</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
