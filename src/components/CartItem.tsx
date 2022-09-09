import { CartItem as CartItemType, useCart } from '../context/CartContext';
import Counter from './Counter';
import removeItem from '../assets/remove-cart-item.svg';
import { Kite } from '../pages/SingleLinePage';
import { useEffect, useState } from 'react';
import { formatCurrency } from '../utilities/formatters';
import { useModalContext } from '../context/ModalContext';

type CartItemProps = {
  kites: Kite[];
} & CartItemType;

export default function CartItem({ id, quantity, kites }: CartItemProps) {
  const { showModal } = useModalContext();
  const { removeItemFromCart, decreaseCartQuantity, increaseCartQuantity } = useCart();
  const [item, setItem] = useState<Kite>();

  useEffect(() => {
    setItem(kites.find(kite => kite.id === id));
  }, [id, kites]);

  const confirmModal = () => {
    showModal('ConfirmModal', {
      title: '',
      onConfirm: () => removeItemFromCart(id),
    });
  };

  if (item == null) return null;

  return (
    <div className="py-6 space-y-2">
      <div className="flex justify-between ">
        <div className="flex space-x-2">
          <div className="w-32 flex-shrink-0">
            <img src={item.imageUrl} alt={`${item.name}`} />
          </div>

          <div className="text-sm md:text-lg ">{item.name}</div>
        </div>

        <button className="w-10 flex-shrink-0 " onClick={confirmModal}>
          <img src={removeItem} alt="remove-cart-item" />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="w-32 h-12 self-center">
          <Counter
            value={quantity}
            increaseValue={() => increaseCartQuantity(id)}
            decreaseValue={() => decreaseCartQuantity(id)}
          />
        </div>
        <div className="font-bold ">{formatCurrency(item.price * quantity)}</div>
      </div>
    </div>
  );
}
