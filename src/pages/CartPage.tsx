import { useEffect, useState } from 'react';
import { Steps, useSteps } from 'react-step-builder';

// hooks
import { useCart } from '../context/CartContext';
import { useApi } from '../hooks/useApi';

// components
import ShippingForm from '../components/forms/ShippingForm';

// misc
import { Product } from '../types/Product';
import { scrollToTop } from '../utilities/window';
import PayingForm from '../components/forms/PayingForm';
import CartSummary from '../components/CartSummary';

// TODO save/load current step to session storage
export default function CartPage() {
  const { next, prev, progress } = useSteps();

  const { getAllKites, getAllMaterials } = useApi();

  const { cartItems } = useCart();

  // TODO products comes from API in the futures
  const [allkites] = useState(getAllKites());
  const [allMaterials] = useState(getAllMaterials());
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const kites = allkites.filter((kite) => cartItems.some((item) => kite.id === item.id));
    const materials = allMaterials.filter((material) => cartItems.some((item) => material.id === item.id));

    setProducts([...kites, ...materials]);
  }, [allMaterials, allkites, cartItems]);

  return (
    <>
      <Steps startsFrom={1} onStepChange={scrollToTop}>
        {/* Step 1 */}
        <>
          <div className="mb-6">
            <CartSummary products={products} />
          </div>

          <div className="flex justify-end mb-6">
            <button className="bg-amber-400 p-4" type="button" onClick={next}>
              🚚 Tovabb a szállításhoz
            </button>
          </div>
        </>

        {/* Step 2 */}
        <div className="md:grid md:grid-cols-2 gap-6">
          <div className="md:sticky top-6 h-min">
            <ShippingForm nextStep={next} />
          </div>

          <CartSummary products={products} isCompact />
        </div>

        {/* Step 3 */}
        <div className="md:grid md:grid-cols-2 gap-6">
          <div className="md:sticky top-6 h-min">
            <PayingForm />
          </div>

          <CartSummary products={products} isCompact />
        </div>

        {/* Step 4 */}
        <div className="">
          <CartSummary products={products} isCompact />
        </div>
      </Steps>

      {/* LATER remove Dev Controls  */}
      <div className="flex items-center space-x-2 m-6">
        <h1>Dev Controls:</h1>
        <button className="bg-blue-400 p-2" type={'button'} onClick={prev}>
          Prev
        </button>
        <button className="bg-red-400 p-2" type={'button'} onClick={next}>
          Next {progress * 100}%
        </button>
      </div>
    </>
  );
}
