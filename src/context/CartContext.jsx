import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "mercado_react_cart";

function getInitialCart() {
  if (typeof window === "undefined") {
    return [];
  }

  const storedCart = window.localStorage.getItem(STORAGE_KEY);

  if (!storedCart) {
    return [];
  }

  try {
    return JSON.parse(storedCart);
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(getInitialCart);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function addToCart(product) {
    setItems((currentItems) => {
      const productAlreadyExists = currentItems.find(
        (item) => item.id === product.id
      );

      if (productAlreadyExists) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      const newItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        category: product.category,
        quantity: 1,
      };

      return [...currentItems, newItem];
    });
  }

  function removeFromCart(id) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== Number(id))
    );
  }

  function increaseQuantity(id) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === Number(id)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function decreaseQuantity(id) {
    setItems((currentItems) =>
      currentItems.flatMap((item) => {
        if (item.id !== Number(id)) {
          return [item];
        }

        if (item.quantity === 1) {
          return [];
        }

        return [{ ...item, quantity: item.quantity - 1 }];
      })
    );
  }

  function clearCart() {
    setItems([]);
  }

  const totalQuantity = items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const subtotal = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const value = {
    items,
    totalQuantity,
    subtotal,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart precisa ser usado dentro de CartProvider.");
  }

  return context;
}