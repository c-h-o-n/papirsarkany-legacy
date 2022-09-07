import { CartItem as CartItemType, useCart } from '../context/CartContext';
import Counter from './Counter';
import removeItem from '../assets/remove-cart-item.svg';
import { Kite } from '../pages/SingleLinePage';
import { useEffect, useState } from 'react';

type CartItemProps = {
  kites: Kite[];
} & CartItemType;

export default function CartItem({ id, quantity, kites }: CartItemProps) {
  const { removeItemFromCart, decreaseCartQuantity, increaseCartQuantity } = useCart();

  const [item, setItem] = useState<Kite>();

  useEffect(() => {
    setItem(kites.find(kite => kite.id === id));

    return () => {};
  }, [id, kites]);

  if (item == null) return null;

  return (
    // TODO mobile first design
    <div className="flex justify-between items-center p-6">
      {/* LATER remove me */}
      {/* <div className="">{id}</div> */}

      <div className="w-32">
        <img src={item.imageUrl} alt={`${item.name}`} />
      </div>

      <div className="">Name: {item.name}</div>

      <div className="w-28 h-10 ">
        <Counter
          value={quantity}
          increaseValue={() => increaseCartQuantity(id)}
          decreaseValue={() => decreaseCartQuantity(id)}
        />
      </div>

      <div className="">{item.price * quantity + ' Ft'}</div>

      <button className="w-10 " onClick={() => removeItemFromCart(id)}>
        <img src={removeItem} alt="remove-cart-item" />
      </button>
    </div>
  );
}
