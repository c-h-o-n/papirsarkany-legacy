import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { Product } from '../types/Product';
import { currencyFormatter } from '../utilities/formatters';
import CartItem from './CartItem';

type CartSummaryProps = {
  products: Product[];
  isCompact?: boolean;
  isEditable?: boolean;
};

export default function CartSummary({ products, isCompact = false, isEditable = true }: CartSummaryProps) {
  const [total, setTotal] = useState(0);

  const { cartItems, shippingCost } = useCart();

  useEffect(() => {
    setTotal(
      cartItems.reduce((total, cartItem) => {
        const product = products.find((product) => product.id === cartItem.id);
        return total + (product?.price || 0) * cartItem.quantity;
      }, 0) + (shippingCost || 0)
    );
  }, [cartItems, products, shippingCost]);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isCompact && (
        <div className="block md:hidden">
          <button
            className="p-2 w-full border-2 border-x-2 border-black rounded-lg mb-2 bg-white"
            type={'button'}
            onClick={() => setIsOpen(!isOpen)}
          >
            Rendelés összesítése
          </button>
        </div>
      )}

      <div className={`${isOpen || !isCompact ? 'block' : 'hidden'} md:block`}>
        <div className="divide-y-2 divide-slate-300 bg-white rounded border-2 border-black px-6 h-min">
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} products={products} isCompact={isCompact} isEditable={isEditable} />
          ))}

          {typeof shippingCost === 'number' && (
            <div className="flex justify-between py-4">
              <div>Szállítási költség</div>
              <div className="font-bold"> {shippingCost ? currencyFormatter(shippingCost) : 'Ingyenes'}</div>
            </div>
          )}

          <div className="flex justify-between text-lg md:text-2xl font-bold py-4">
            <div>Összeg</div>
            <div>{currencyFormatter(total)}</div>
          </div>
        </div>
      </div>
    </>
  );
}
