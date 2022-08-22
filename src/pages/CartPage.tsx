import { useCart } from '../context/CartContext';

import CartCard from '../components/CartCard';

export default function CartPage() {
  const { cartItems } = useCart();

  return (
    <div>
      {cartItems.map(item => (
        <CartCard key={item.id} item={item} />
      ))}
    </div>
  );
}
