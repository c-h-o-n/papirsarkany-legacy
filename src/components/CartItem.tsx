import { useState } from 'react';

// assets
import { currencyFormatter } from '../utilities/formatters';
import removeItem from '../assets/remove-cart-item.svg';

import { CartItem as CartItemType, useCart } from '../context/CartContext';

// components
import Counter from './Counter';

// types
import { Product } from '../types/Product';

type CartItemProps = CartItemType & {
  products: Product[];
  isEditable?: boolean;
  isCompact?: boolean;
};

export default function CartItem({ id, quantity, products, isCompact = false, isEditable = true }: CartItemProps) {
  const { removeItemFromCart, decreaseCartQuantity, increaseCartQuantity } = useCart();
  const [item] = useState(products.find((product) => product.id === id));

  if (item == null) {
    return null;
  }

  if (isCompact) {
    return (
      <div className="py-4 ">
        <div className="flex justify-between items-center">
          <div className="text-sm md:text-lg ">
            {item.name} <span className="text-xs font-bold text-gray-400 ">{quantity} db</span>
          </div>
          <div className="font-bold ">{currencyFormatter(item.price * quantity)}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          {item.imageUrl && <img className="w-32 h-32 object-contain" src={item.imageUrl} alt={`${item.name}`} />}

          <div className="text-sm md:text-lg ">{item.name}</div>
        </div>

        {isEditable && (
          <button className="h-10 w-10" type={'button'} onClick={() => removeItemFromCart(id)}>
            <img src={removeItem} alt="remove-cart-item" />
          </button>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="w-32 h-12">
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
