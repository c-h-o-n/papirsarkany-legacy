import { CartItem, useCart } from '../context/CartContext';
import Counter from './Counter';
import removeItem from '../assets/remove-cart-item.svg';

type CartItemProps = {
  item: CartItem;
};

export default function CartCard({ item }: CartItemProps) {
  const { getItemQuantity, removeItemFromCart, decreaseCartQuantity, increaseCartQuantity } = useCart();

  return (
    <div className="flex justify-between items-center m-6" key={item.id}>
      <div className="">Id: {item.id}</div>

      <div className="">Quantity {item.quantity}</div>

      <Counter
        value={getItemQuantity(item.id)}
        increaseValue={() => increaseCartQuantity(item.id)}
        decreaseValue={() => decreaseCartQuantity(item.id)}
      />

      <button className="w-10 " onClick={() => removeItemFromCart(item.id)}>
        <img src={removeItem} alt="remove-cart-item" />
      </button>
    </div>
  );
}
