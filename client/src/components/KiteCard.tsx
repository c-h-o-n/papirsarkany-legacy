import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';
import AddToCartToastMessage from './toasts/AddToCartToast';

import addItem from '../assets/add-item.svg';
import { Kite } from '../types/Kite';
import { currencyFormatter } from '../utilities/formatters';

type KiteCardProps = {
  kite: Kite;
};

export default function KiteCard({ kite }: KiteCardProps) {
  const { increaseCartQuantity } = useCart();

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 max-w-sm relative mx-auto break-inside-avoid">
      <h1 className="text-lg text-center font-medium mb-3">{kite.name}</h1>

      <div className="mb-1">
        {kite.imageUrl && <img src={kite.imageUrl} alt={kite.name} />}
        {/* {kite.imageUrl && <img src={kite.imageUrl} alt={kite.name} className="object-contain w-full h-[300px]" />} */}
      </div>

      {kite.details && (
        <div className="mb-3 text-sm">
          <div className="text-sky-500 font-bold underline text-center">
            {kite.details.isBeginner && 'Kezdőknek ajánlott!'}
          </div>
          <div className="">Méret: {kite.details.dimensions}</div>
          <div className="">Anyagok: {kite.details.materials}</div>
          <div className="">Szélerősség: {kite.details.wind}</div>
        </div>
      )}

      <div className="text-center text-3xl font-bold text-sky-500">{currencyFormatter(kite.price)}</div>

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
