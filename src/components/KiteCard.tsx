import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';

import addItem from '../assets/add-item.svg';
import AddToCartToastMessage from './toasts/AddToCartToast';
import { Product } from '../types/Product';

type KiteCardProps = {
  kite: Product;
};

export default function KiteCard({ kite }: KiteCardProps) {
  const { increaseCartQuantity } = useCart();

  return (
    <div className="bg-white rounded-3xl shadow-md p-6 max-w-sm relative">
      <h1 className="text-lg text-center font-medium mb-3">{kite.name}</h1>

      <div className="mb-3">{kite.imageUrl && <img src={kite.imageUrl} alt={kite.name} />}</div>

      <div className="text-center text-3xl font-bold text-sky-500">{kite.price} Ft</div>

      <div className=" absolute bottom-6 right-6 flex items-center justify-end space-x-3">
        <button
          type={'button'}
          onClick={() => {
            increaseCartQuantity(kite.id);
            toast(<AddToCartToastMessage />, { toastId: 'to-prevent-duplicate' });
          }}
        >
          <img src={addItem} alt="add-item" className="w-8" />
        </button>
      </div>
    </div>
  );
}
