import { useState } from 'react';
import { Steps, useSteps } from 'react-step-builder';

import CartSummary from '../CartSummary';
import CheckoutSummary from '../CheckoutSummary';
import OrderForm from './OrderForm';
import PayingForm from './PayingForm';
import ShippingForm from './ShippingForm';

import { scrollToTop } from '../../utilities/window';
import { CheckoutFormInput } from '../../types/CheckoutFormInput';
import { Product } from '../../types/Product';

type CheckoutFormWrapperProps = {
  products: Product[];
};

const initialFormValues: CheckoutFormInput = {
  contact: {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
  },
  paymentOption: '',
  shippingOption: '',

  shipping: {
    postcode: '',
    city: '',
    address: '',
    subaddress: '',
  },
  billing: {
    postcode: '',
    city: '',
    address: '',
    subaddress: '',
  },
  comment: '',

  isSameAdressAsShipping: true,
};

// TODO ensure autofill to be correct https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#values
export default function CheckoutFormWrapper({ products }: CheckoutFormWrapperProps) {
  const { next } = useSteps();

  const [formValues, setFormValues] = useState<CheckoutFormInput>(initialFormValues);

  const updateFormValues = (values: Partial<CheckoutFormInput>) => {
    setFormValues({ ...formValues, ...values });
  };

  return (
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
      <div className="space-y-6">
        <div>
          <CheckoutSummary formValues={formValues} />
        </div>

        <div>
          <CartSummary products={products} isEditable={false} />
        </div>

        <OrderForm formValues={formValues} />
      </div>

      {/* Final step */}
      <div className="absolute grid items-center h-screen inset-0 text-center">
        <div>
          <h1 className="text-2xl md:text-5xl">Sikeres rendelés.</h1>
          <p className="">Hamarosan felveszem önnel a kapcsolatot.</p>
        </div>
      </div>
    </Steps>
  );
}
