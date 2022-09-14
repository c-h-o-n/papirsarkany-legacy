import { useEffect, useState } from 'react';
import NiceModal from '@ebay/nice-modal-react';

// assets
import { formatCurrency } from '../utilities/formatters';
import removeItem from '../assets/remove-cart-item.svg';

import { CartItem as CartItemType, useCart } from '../context/CartContext';

// components
import Counter from './Counter';
import ConfirmModal, { ConfirmModalResponse } from './modals/ConfirmModal';

// types
import { Kite } from '../types/Kite';

type CartItemProps = {
  kites: Kite[];
} & CartItemType;

export default function CartItem({ id, quantity, kites }: CartItemProps) {
  const modal = NiceModal.useModal(ConfirmModal, { title: 'Megerősítés' });

  const { removeItemFromCart, decreaseCartQuantity, increaseCartQuantity } = useCart();
  const [item, setItem] = useState<Kite>();

  useEffect(() => {
    setItem(kites.find((kite) => kite.id === id));
  }, [id, kites]);

  // LATER remove unnecessery modal (experimental purposes)
  const confirmModal = () => {
    modal.show({ title: 'Biztosan törli?' }).then((res) => {
      if ((res as ConfirmModalResponse) === 'confirm') {
        removeItemFromCart(id);
      }
      modal.remove();
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

        <button className="w-10 flex-shrink-0 " type={'button'} onClick={confirmModal}>
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
