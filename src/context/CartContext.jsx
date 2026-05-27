import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

function loadCart() {
  try {
    const data = localStorage.getItem("furniture_cart");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.find(c => c.product_id === action.payload.id);
      if (existing) {
        return state.map(c =>
          c.product_id === action.payload.id
            ? { ...c, quantity: c.quantity + 1 }
            : c
        );
      }
      return [
        ...state,
        {
          product_id: action.payload.id,
          product_name: action.payload.name,
          quantity: 1,
          negotiated_price: action.payload.price
        }
      ];
    }
    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        return state.filter(c => c.product_id !== action.payload.id);
      }
      return state.map(c =>
        c.product_id === action.payload.id
          ? { ...c, quantity: action.payload.quantity }
          : c
      );
    }
    case "REMOVE_FROM_CART":
      return state.filter(c => c.product_id !== action.payload.id);
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], loadCart);

  useEffect(() => {
    localStorage.setItem("furniture_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.negotiated_price || 0) * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}