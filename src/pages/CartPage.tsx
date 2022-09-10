import { useEffect, useState } from 'react';
// hooks
import { Steps, useSteps } from 'react-step-builder';
import { useCart } from '../context/CartContext';
import { useApi } from '../hooks/useApi';

// components
import CartItem from '../components/CartItem';
import CheckOut from '../components/CheckOut';

import CartSummary from '../components/CartSummary';
import { formatCurrency } from '../utilities/formatters';

export default function CartPage() {
  const { next, prev, current } = useSteps();
  const { getAllKites } = useApi();

  const { cartItems } = useCart();
  const [kites] = useState(getAllKites());
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      cartItems.reduce((total, cartItem) => {
        const item = kites.find((kite) => kite.id === cartItem.id);
        return total + (item?.price || 0) * cartItem.quantity;
      }, 0)
    );
  }, [cartItems, kites]);

  return (
    <>
      {/* LATER remove Dev Controls  */}
      <div className="flex items-center space-x-2 m-6">
        <h1>Dev Controls:</h1>
        <button className="bg-blue-400 p-2" type={'button'} onClick={prev}>
          Prev
        </button>
        <button className="bg-red-400 p-2" type={'button'} onClick={next}>
          Next {current}
        </button>
      </div>

      <Steps startsFrom={1}>
        {/* Step 1 */}
        <>
          <div className="divide-y">
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} kites={kites} />
            ))}
          </div>

          <div className="">Összeg: {formatCurrency(total)}</div>

          <button className="bg-red-400 p-4" type="button" onClick={next}>
            Tovabb a penztarhoz
          </button>
        </>

        {/* Step 2 */}
        <div className="md:grid md:grid-cols-2">
          <div className="">
            <CheckOut />
          </div>
          <div className="flex flex-col divide-y">
            {cartItems.map((item) => (
              <CartSummary key={item.id} {...item} kites={kites} />
            ))}
          </div>
        </div>
      </Steps>
    </>
  );
}
