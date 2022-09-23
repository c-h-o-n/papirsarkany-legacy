import { useCart } from '../context/CartContext';
import { Product } from '../types/Product';
import { currencyFormatter } from '../utilities/formatters';
import CartItem from './CartItem';

type CartSummaryProps = {
  total: number;
  products: Product[];
};

export default function CartSummary({ total, products }: CartSummaryProps) {
  const { cartItems, shippingCost } = useCart();
  return (
    <div className="divide-y-2 divide-gray-300 bg-white rounded border-2 border-black p-6 h-min">
      {cartItems.map((item) => (
        <CartItem key={item.id} {...item} products={products} isCompact />
      ))}
      <div className="flex justify-between">
        <div>Szállítási költség:</div>{' '}
        <div className="font-bold"> {shippingCost ? currencyFormatter(shippingCost) : 'Ingyenes'}</div>
      </div>
      <div className="flex justify-between text-lg font-bold">
        <div>Összeg:</div>
        <div>{currencyFormatter(total)}</div>
      </div>
    </div>
  );
}
