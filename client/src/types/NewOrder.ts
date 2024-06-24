import { CartItem } from '../context/CartContext';
import { CheckoutFormInput } from './CheckoutFormInput';

export type NewOrder = CheckoutFormInput & {
  products: CartItem[];
};
