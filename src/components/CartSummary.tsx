import { CartItem as CartItemType } from '../context/CartContext';

import { Kite } from '../pages/SingleLinePage';
import { useEffect, useState } from 'react';

type CartItemProps = {
  kites: Kite[];
} & CartItemType;

// THINK maybe violates DRY
export default function CartSummary({ id, quantity, kites }: CartItemProps) {
  const [item, setItem] = useState<Kite>();

  useEffect(() => {
    setItem(kites.find(kite => kite.id === id));

    return () => {};
  }, [id, kites]);

  if (item == null) return null;

  return (
    <div className="flex justify-between items-center p-6">
      <div className="w-32">
        <img src={item.imageUrl} alt={`${item.name}`} />
      </div>

      <div className="">
        <div className="">Name: {item.name}</div>
        <div className="">{quantity} db</div>
      </div>
      <div className="">{item.price * quantity + ' Ft'}</div>
    </div>
  );
}
