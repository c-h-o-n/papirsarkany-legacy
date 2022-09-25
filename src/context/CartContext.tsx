import { createContext, ReactNode, useMemo, useContext, useState } from 'react';
import { CheckoutFormInput } from '../types/CheckoutFormInput';

type CartContextType = {
  cartItems: CartItem[];
  shippingCost: number;
  updateShippingCost: (value: number) => void;
  getTotalCartQuantity: () => number;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeItemFromCart: (id: number) => void;
  checkoutFormValues: CheckoutFormInput;
  updateFormValues: (data: Partial<CheckoutFormInput>) => void;
};

export type CartItem = {
  id: number;
  quantity: number;
};

type CartProviderProps = {
  children: ReactNode;
};

const CartContext = createContext({} as CartContextType);

const initialCheckoutFormValues: CheckoutFormInput = {
  shipping: {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    mode: '',
    postcode: '',
    city: '',
    address: '',
    subaddress: '',
  },
  billing: {
    mode: '',
    postcode: '',
    city: '',
    address: '',
    subaddress: '',
  },
};

export function useCart() {
  return useContext(CartContext);
}

// TODO save/load cartItems to localstorage
// THINK using cookies for personal information ?! GDPR
export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 0, quantity: 2 },
    { id: 2, quantity: 3 },
    { id: 53, quantity: 4 },
  ]);

  const [shippingCost, setShippingCost] = useState(0);

  const [checkoutFormValues, setCheckoutFormValues] = useState<CheckoutFormInput>(initialCheckoutFormValues);

  const value = useMemo<CartContextType>(() => {
    const updateFormValues = (data: Partial<CheckoutFormInput>) => {
      setCheckoutFormValues({ ...checkoutFormValues, ...data });
    };
    const getTotalCartQuantity = () => cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

    const updateShippingCost = (value: number) => {
      setShippingCost(value);
    };

    const getItemQuantity = (id: number): number => {
      return cartItems.find((item) => item.id === id)?.quantity || 0;
    };

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

    return {
      cartItems,
      shippingCost,
      updateShippingCost,
      getTotalCartQuantity,
      getItemQuantity,
      increaseCartQuantity,
      decreaseCartQuantity,
      removeItemFromCart: removeFromCart,
      checkoutFormValues,
      updateFormValues,
    };
  }, [cartItems, checkoutFormValues, shippingCost]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
