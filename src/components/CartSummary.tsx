import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { Product } from '../types/Product';
import { currencyFormatter } from '../utilities/formatters';
import CartItem from './CartItem';

type CartSummaryProps = {
  products: Product[];
  isCompact?: boolean;
};

export default function CartSummary({ products, isCompact = false }: CartSummaryProps) {
  const [total, setTotal] = useState(0);

  const { cartItems, shippingCost } = useCart();

  useEffect(() => {
    setTotal(
      cartItems.reduce((total, cartItem) => {
        const product = products.find((product) => product.id === cartItem.id);
        return total + (product?.price || 0) * cartItem.quantity;
      }, 0) + shippingCost
    );
  }, [cartItems, products, shippingCost]);

  if (!isCompact) {
    return (
      <>
        <div className="divide-y-2 divide-gray-300 border-b-gray-300 border-b-2 mb-6">
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} products={products} />
          ))}
        </div>
        <div className="flex justify-end">
          <div className="text-3xl font-bold">Összeg: {currencyFormatter(total)}</div>
        </div>
      </>
    );
  }

  return (
    <div className="divide-y-2 divide-gray-300 bg-white rounded border-2 border-black p-6 h-min">
      {cartItems.map((item) => (
        <CartItem key={item.id} {...item} products={products} isCompact={isCompact} />
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
