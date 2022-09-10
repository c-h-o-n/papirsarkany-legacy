import { useCart } from '../context/CartContext';

// assets
import cart from '../assets/cart.svg';

export default function Cart() {
  const { cartQuantity } = useCart();

  return (
    <div className="relative">
      <img src={cart} alt="kosár" className="w-10" />
      <div className="absolute bottom-0 right-0 px-1 py-0.5 text-xs leading-none font-bold outline outline-white outline-1  text-sky-50 bg-sky-600 rounded-full">
        {cartQuantity}
      </div>
    </div>
  );
}
