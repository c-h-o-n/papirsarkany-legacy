import { createContext, ReactNode, useContext, useState } from 'react';

type CartContext = {
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeItemFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

export type CartItem = {
  id: number;
  quantity: number;
};

type CartProviderProps = {
  children: ReactNode;
};

const CartContext = createContext({} as CartContext);

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 0, quantity: 2 },
    { id: 1, quantity: 1 },
    { id: 2, quantity: 3 },
  ]);

  const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

  const getItemQuantity = (id: number): number => {
    return cartItems.find(item => item.id === id)?.quantity || 0;
  };

  const increaseCartQuantity = (id: number): void => {
    setCartItems((currentItems: CartItem[]) => {
      if (!currentItems.find(item => item.id === id)) {
        return [...currentItems, { id, quantity: 1 }];
      }

      return currentItems.map(item => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  };

  const decreaseCartQuantity = (id: number): void => {
    setCartItems((currentItems: CartItem[]) => {
      if (currentItems.find(item => item.id === id)?.quantity === 1) {
        return currentItems;
      }

      return currentItems.map(item => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    });
  };

  const removeFromCart = (id: number): void => {
    setCartItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartQuantity,
        getItemQuantity,
        increaseCartQuantity: increaseCartQuantity,
        decreaseCartQuantity: decreaseCartQuantity,
        removeItemFromCart: removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
