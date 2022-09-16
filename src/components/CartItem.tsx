import { useEffect, useState } from 'react';
import NiceModal from '@ebay/nice-modal-react';

// assets
import { currencyFormatter } from '../utilities/formatters';
import removeItem from '../assets/remove-cart-item.svg';

import { CartItem as CartItemType, useCart } from '../context/CartContext';

// components
import Counter from './Counter';
import ConfirmModal, { ConfirmModalResponse } from './modals/ConfirmModal';

// types
import { Product } from '../types/Product';

type CartItemProps = CartItemType & {
  products: Product[];
  isEditable?: boolean;
};

export default function CartItem({ id, quantity, products, isEditable = true }: CartItemProps) {
  const modal = NiceModal.useModal(ConfirmModal, { title: 'Megerősítés' });

  const { removeItemFromCart, decreaseCartQuantity, increaseCartQuantity } = useCart();
  const [item, setItem] = useState<Product>();

  useEffect(() => {
    setItem(products.find((product) => product.id === id));
  }, [id, products]);

  // LATER remove unnecessery modal (experimental purposes)
  const confirmModal = () => {
    modal.show({ title: 'Biztosan törli?' }).then((res) => {
      if ((res as ConfirmModalResponse) === 'confirm') {
        removeItemFromCart(id);
      }
      modal.remove();
    });
  };

  if (item == null) {
    return null;
  }

  return (
    <div className="py-6 space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          {item.imageUrl && <img className="w-32 h-32 object-contain" src={item.imageUrl} alt={`${item.name}`} />}

          <div className="text-sm md:text-lg ">{item.name}</div>
        </div>

        {isEditable && (
          <button className="h-10 w-10" type={'button'} onClick={confirmModal}>
            <img src={removeItem} alt="remove-cart-item" />
          </button>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="w-32 h-12 self-center">
          {isEditable && (
            <Counter
              value={quantity}
              increaseValue={() => increaseCartQuantity(id)}
              decreaseValue={() => decreaseCartQuantity(id)}
            />
          )}
        </div>
        <div className="font-bold ">{currencyFormatter(item.price * quantity)}</div>
      </div>
    </div>
  );
}
