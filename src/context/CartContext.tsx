import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

type CartContextType = {
  cartItems: CartItem[];
  cartQuantity: number;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeItemFromCart: (id: number) => void;
};

export type CartItem = {
  id: number;
  quantity: number;
};

type CartProviderProps = {
  children: ReactNode;
};

const CartContext = createContext({} as CartContextType);

export function useCart() {
  return useContext(CartContext);
}

// CHECK is there any perfomance gain? [ModalContext]
export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 0, quantity: 2 },
    { id: 1, quantity: 1 },
    { id: 2, quantity: 3 },
  ]);

  const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

  const getItemQuantity = useCallback(
    (id: number): number => {
      return cartItems.find((item) => item.id === id)?.quantity || 0;
    },
    [cartItems]
  );

  const increaseCartQuantity = (id: number): void => {
    setCartItems((currentItems: CartItem[]) => {
      if (!currentItems.find((item) => item.id === id)) {
        return [...currentItems, { id, quantity: 1 }];
      }

      return currentItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  };

  const decreaseCartQuantity = (id: number): void => {
    setCartItems((currentItems: CartItem[]) => {
      if (currentItems.find((item) => item.id === id)?.quantity === 1) {
        return currentItems;
      }

      return currentItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    });
  };

  const removeFromCart = (id: number): void => {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  const value = useMemo(() => {
    return {
      cartItems,
      cartQuantity,
      getItemQuantity,
      increaseCartQuantity,
      decreaseCartQuantity,
      removeItemFromCart: removeFromCart,
    };
  }, [cartItems, cartQuantity, getItemQuantity]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
