import { toast } from 'react-toastify';

import { useCart } from '../context/CartContext';
import { Material } from '../types/Material';

// assets
import addItem from '../assets/add-item.svg';
import AddToCartToastMessage from './toasts/AddToCartToast';

type MaterialCardProps = {
  material: Material;
};

export default function MaterialCard({ material }: MaterialCardProps) {
  const { increaseCartQuantity } = useCart();

  return (
    <div className="flex gap-2 items-center  max-w-sm bg-white rounded-3xl shadow-md p-6 relative">
      {material.imageUrl && <img className="min-w-0 max-w-full" src={material.imageUrl} alt={material.name} />}
      <h1 className="font-medium flex-shrink">{material.name}</h1>

      <div className="font-bold text-sky-500 flex-shrink-0">{material.price} Ft</div>

      <button
        className="flex-shrink-0"
        type={'button'}
        onClick={() => {
          increaseCartQuantity(material.id);
          toast(<AddToCartToastMessage />);
          toast.clearWaitingQueue();
        }}
      >
        <img src={addItem} alt="add-item" className="w-8" />
      </button>
    </div>
  );
}
