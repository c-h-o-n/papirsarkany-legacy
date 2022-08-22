import { CartItem, useCart } from '../context/CartContext';
import Counter from './Counter';
import removeItem from '../assets/remove-cart-item.svg';

type CartItemProps = {
  item: CartItem;
};

export default function CartCard({ item }: CartItemProps) {
  const { increaseCartQuantity, decreaseCartQuantity, removeItemFromCart } = useCart();

  return (
    <div className="flex justify-between items-center m-6" key={item.id}>
      <div className="">Id: {item.id}</div>

      <div className="">Quantity {item.quantity}</div>

      <Counter initialValue={item.id} increase={increaseCartQuantity} decrease={decreaseCartQuantity} />

      <button className="w-10 " onClick={() => removeItemFromCart(item.id)}>
        <img src={removeItem} alt="remove-cart-item" />
      </button>
    </div>
  );
}
