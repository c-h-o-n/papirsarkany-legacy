import { useEffect, useState } from 'react';
import { Steps, useSteps } from 'react-step-builder';
import CartSummary from '../components/CartSummary';
import CheckoutFormSummary from '../components/CheckoutFormSummary';
import OrderForm from '../components/forms/OrderForm';
import PayingForm from '../components/forms/PayingForm';
import ShippingForm from '../components/forms/ShippingForm';

import { useCart } from '../context/CartContext';
import { useApi } from '../hooks/useApi';
import { CheckoutFormInput } from '../types/CheckoutFormInput';
import { Product } from '../types/Product';
import { scrollToTop } from '../utilities/window';

const initialFormValues: CheckoutFormInput = {
  shipping: {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    mode: '',
    postcode: '',
    city: '',
    address: '',
    subaddress: '',
  },
  billing: {
    mode: '',
    postcode: '',
    city: '',
    address: '',
    subaddress: '',
  },
  comment: '',
};

export default function CartPage() {
  const [formValues, setFormValues] = useState<CheckoutFormInput>(initialFormValues);
  const updateFormValues = (values: Partial<CheckoutFormInput>) => {
    setFormValues({ ...formValues, ...values });
  };
  const resetFormValues = () => {
    setFormValues(initialFormValues);
  };

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
  const { next, prev, progress } = useSteps();
  return (
    <>
      <div className="mt-4">
        <Steps onStepChange={scrollToTop}>
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
              <ShippingForm formValues={formValues.shipping} updateFormValues={updateFormValues} />
            </div>

            <CartSummary products={products} isCompact />
          </div>

          {/* Step 3 */}
          <div className="md:grid md:grid-cols-2 gap-6">
            <div className="md:sticky top-6 h-min">
              <PayingForm formValues={formValues.billing} updateFormValues={updateFormValues} />
            </div>

            <CartSummary products={products} isCompact />
          </div>

          {/* Step 4 */}
          <div>
            <div className="mb-6">
              <CheckoutFormSummary formValues={formValues} />
            </div>
            <div className="mb-6">
              <CartSummary products={products} isCompact />
            </div>

            <OrderForm formValues={formValues} resetFormValues={resetFormValues} />
          </div>
          {/* Step 5 */}
          <div className="text-3xl flex justify-center">Sikeres rendelés</div>
        </Steps>
      </div>

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
