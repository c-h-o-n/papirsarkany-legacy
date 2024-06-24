import { CartItem } from '../context/CartContext';
import { CheckoutFormInput } from './CheckoutFormInput';

export type Order = CheckoutFormInput & {
  products: CartItem[];
};
