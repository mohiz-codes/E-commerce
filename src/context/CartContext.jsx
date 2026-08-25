import { useEffect, useState } from "react";
import { CartContext } from "./CartContextValue.js";

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() =>
    JSON.parse(localStorage.getItem("cart") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(product, quantity = 1, size = "", color = "") {
    setCart((items) => {
      const existing = items.find((item) => item._id === product._id && item.size === size && item.color === color);
      if (existing) {
        return items.map((item) => item._id === product._id && item.size === size && item.color === color
          ? { ...item, quantity: item.quantity + quantity }
          : item);
      }
      return [...items, { ...product, quantity, size, color }];
    });
  }

  function updateQuantity(id, quantity) {
    setCart((items) => items
      .map((item) => item._id === id ? { ...item, quantity } : item)
      .filter((item) => item.quantity > 0));
  }

  function removeFromCart(id) {
    setCart((items) => items.filter((item) => item._id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

