import { createContext, ReactNode, useMemo, useContext, useState } from 'react';

type CartContextType = {
  cartItems: CartItem[];
  shippingCost: number | undefined;
  updateShippingCost: (value: number | undefined) => void;
  getTotalCartQuantity: () => number;
  getItemQuantity: (id: string) => number;
  increaseCartQuantity: (id: string) => void;
  decreaseCartQuantity: (id: string) => void;
  removeItemFromCart: (id: string) => void;
  removeAllItemFormCart: () => void;
};

export type CartItem = {
  id: string;
  quantity: number;
};

type CartProviderProps = {
  children: ReactNode;
};

const CartContext = createContext({} as CartContextType);

export function useCart() {
  return useContext(CartContext);
}

// TODO save/load cartItems to localstorage
// THINK using cookies for personal information ?! GDPR
export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [shippingCost, setShippingCost] = useState<CartContextType['shippingCost']>();

  const value = useMemo<CartContextType>(() => {
    const getTotalCartQuantity = () => cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

    const updateShippingCost = (value: number | undefined) => {
      setShippingCost(value);
    };

    const getItemQuantity = (id: string): number => {
      return cartItems.find((item) => item.id === id)?.quantity || 0;
    };

    const increaseCartQuantity = (id: string): void => {
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

    const decreaseCartQuantity = (id: string): void => {
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

    const removeItemFromCart = (id: string): void => {
      setCartItems((currentItems) => currentItems.filter((item) => item.id !== id));
    };

    const removeAllItemFormCart = (): void => {
      setCartItems([]);
      setShippingCost(undefined);
    };

    return {
      cartItems,
      shippingCost,
      updateShippingCost,
      getTotalCartQuantity,
      getItemQuantity,
      increaseCartQuantity,
      decreaseCartQuantity,
      removeItemFromCart,
      removeAllItemFormCart,
    };
  }, [cartItems, shippingCost]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
