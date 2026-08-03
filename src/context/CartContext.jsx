"use client";

import { createContext, useEffect, useState } from "react";
import { cartService } from "@/services/cart.service";

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const { data } = await cartService.getCart();
        setCartCount(data?.data?.items?.length || 0);
      } catch (err) {
        console.log(err);
      }
    };

    loadCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        setCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
