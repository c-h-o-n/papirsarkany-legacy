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
  contact: {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
  },
  shipping: {
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
  const { next, isFirst } = useSteps();

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

  if (!cartItems.length && isFirst) {
    return (
      <div className="absolute grid items-center h-screen inset-0">
        <h1 className="text-2xl md:text-5xl text-center">Üres a kosarad.</h1>
      </div>
    );
  }

  return (
    <>
      <div className="my-6">
        <Steps onStepChange={scrollToTop}>
          {/* Step 1 */}
          <>
            <h1 className="text-3xl font-bold text-center my-6">Kosár tartalma</h1>
            <div className="mb-6">
              <CartSummary products={products} />
            </div>

            <div className="flex justify-end">
              <button className="bg-amber-400 p-3 rounded" type="button" onClick={next}>
                Tovább a szállításhoz
              </button>
            </div>
          </>

          {/* Step 2 */}
          <div className="md:grid md:grid-cols-2 gap-6">
            <div className="row-start-1 col-start-2">
              <CartSummary products={products} isCompact />
            </div>
            <div className="md:sticky md:top-0 h-min row-start-1 col-start-1">
              <ShippingForm formValues={formValues} updateFormValues={updateFormValues} />
            </div>
          </div>

          {/* Step 3 */}
          <div className="md:grid md:grid-cols-2 gap-6">
            <div className="row-start-1 col-start-2">
              <CartSummary products={products} isCompact />
            </div>

            <div className="md:sticky md:top-0 h-min">
              <PayingForm formValues={formValues} updateFormValues={updateFormValues} />
            </div>
          </div>

          {/* Step 4 */}
          <div>
            <div className="mb-6">
              <CheckoutFormSummary formValues={formValues} />
            </div>
            <div>
              <CartSummary products={products} isEditable={false} />
            </div>

            <OrderForm formValues={formValues} resetFormValues={resetFormValues} />
          </div>

          {/* Step 5 */}
          <div className="absolute grid items-center h-screen inset-0">
            <h1 className="text-2xl md:text-5xl text-center">Sikeres rendelés.</h1>
          </div>
        </Steps>
      </div>

      {/* LATER remove Dev Controls  */}
      {/* <div className="flex items-center space-x-2 m-6">
        <h1>Dev Controls:</h1>
        <button className="bg-blue-400 p-2" type={'button'} onClick={prev}>
          Prev
        </button>
        <button className="bg-red-400 p-2" type={'button'} onClick={next}>
          Next {progress * 100}%
        </button>
      </div> */}
    </>
  );
}
