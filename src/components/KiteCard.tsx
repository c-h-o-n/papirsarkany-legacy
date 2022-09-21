import { toast } from 'react-toastify';
import { Kite } from '../types/Kite';
import { useCart } from '../context/CartContext';

import kiteImage from '../assets/kite-placeholder.png';
import addItem from '../assets/add-item.svg';
import AddToCartToastMessage from './toasts/AddToCartToast';

type KiteCardProps = {
  kite: Kite;
};

export default function KiteCard({ kite }: KiteCardProps) {
  const { increaseCartQuantity } = useCart();

  return (
    <div className="bg-white rounded-3xl shadow-md k p-6 max-w-sm relative">
      <h1 className="text-lg text-center font-medium mb-3">{kite.name}</h1>

      <div className="mb-3">
        <img src={kiteImage} alt={kite.name} />
      </div>

      <div className="text-center text-3xl font-bold text-sky-500">{kite.price} Ft</div>

      <div className=" absolute bottom-6 right-6 flex items-center justify-end space-x-3">
        <button
          type={'button'}
          onClick={() => {
            increaseCartQuantity(kite.id);
            toast(<AddToCartToastMessage />);
            toast.clearWaitingQueue();
          }}
        >
          <img src={addItem} alt="add-item" className="w-8" />
        </button>
      </div>
      {/* <div className="text-center">
        <div>{kite.size}</div>
        <div className="">{kite.details}</div>
        <div>{kite.isBeginner ? 'Kezdo' : ''}</div>
        <div>{kite.material}</div>
      </div> */}
    </div>
  );
}
