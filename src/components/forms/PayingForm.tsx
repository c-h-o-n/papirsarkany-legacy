import { SubmitHandler, useForm } from 'react-hook-form';
import { useSteps } from 'react-step-builder';

import { CheckoutFormInput } from '../../types/CheckoutFormInput';

type FormInput = CheckoutFormInput['billing'] &
  Pick<CheckoutFormInput, 'paymentOption'> & { isSameAdressAsShipping: boolean };

type PayingFormProps = {
  formValues: CheckoutFormInput;
  updateFormValues: (values: Partial<CheckoutFormInput>) => void;
};

export default function PayingForm({ formValues, updateFormValues }: PayingFormProps) {
  const { next, prev } = useSteps();

  const { register, handleSubmit, watch } = useForm<FormInput>({
    defaultValues: {
      isSameAdressAsShipping: formValues.isSameAdressAsShipping,
      paymentOption: formValues.paymentOption,
      postcode: formValues.billing.postcode,
      city: formValues.billing.city,
      address: formValues.billing.address,
      subaddress: formValues.billing.subaddress,
    },
  });

  const isSameAdressAsShipping = watch('isSameAdressAsShipping');

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    updateFormValues({
      paymentOption: data.paymentOption,
      billing: {
        address: data.address,
        city: data.city,
        postcode: data.postcode,
        subaddress: data.subaddress,
      },
      isSameAdressAsShipping: data.isSameAdressAsShipping,

      ...(isSameAdressAsShipping &&
        formValues.shippingOption === 'Postai szállítás' && {
          billing: {
            address: formValues.shipping.address,
            city: formValues.shipping.city,
            postcode: formValues.shipping.postcode,
            subaddress: formValues.shipping.subaddress,
          },
        }),
    });

    next();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-x-2 gap-y-4 grid-cols-4">
        <div className="col-span-full text-lg underline">Fizetés</div>

        {/* Upon receipt   */}
        <div className="col-span-full">
          <label htmlFor="upon-receipt">
            <input
              {...register('paymentOption')}
              id="upon-receipt"
              type="radio"
              value={'Átvételkor készpénzel'}
              required
            />
            <span className="ml-2">Átvételkor készpénzel</span>
          </label>
        </div>

        {formValues.shippingOption === 'Postai szállítás' && (
          <>
            {/* Bank transfer */}
            <div className="col-span-full">
              <label htmlFor="bank-transfer">
                <input
                  {...register('paymentOption')}
                  id="bank-transfer"
                  type="radio"
                  value={'Előreutalással'}
                  required
                />
                <span className="ml-2">Előreutalással</span>
              </label>
            </div>
            <div className="col-span-full text-lg underline">Számlázási cím</div>

            <div className="col-span-full">
              <label htmlFor="same-as-shpping-address">
                <input {...register('isSameAdressAsShipping')} id="same-as-shpping-address" type={'checkbox'} />
                <span className="ml-2">A számlázási adataim megegyeznek a szállítási címemmel</span>
              </label>
            </div>
          </>
        )}

        {/* Billing information */}
        {(formValues.shippingOption === 'Személyes átvétel' || !isSameAdressAsShipping) && (
          <>
            {/* Postcode */}
            <div className="col-span-1">
              <label htmlFor="postcode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Irányítószám
                <input
                  {...register('postcode')}
                  type="postcode"
                  id="postcode"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="irányítószám"
                  required
                />
              </label>
            </div>

            {/* City */}
            <div className="col-span-3">
              <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Város
                <input
                  {...register('city')}
                  type={'text'}
                  id="city"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="város"
                  required
                />
              </label>
            </div>

            {/* Address */}
            <div className="col-span-full">
              <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Cím
                <input
                  {...register('address')}
                  type={'text'}
                  id="address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Utca, házszám"
                  required
                />
              </label>
            </div>

            {/* Subaddress */}
            <div className="col-span-full">
              <label htmlFor="subaddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                <input
                  {...register('subaddress')}
                  type={'text'}
                  id="subaddress"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Emelet, ajtó egyéb (opcionális)"
                />
              </label>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-wrap justify-between gap-4">
        <button className="p-3 bg-gray-200 w-full lg:w-auto rounded order-1 lg:-order-1" type={'button'} onClick={prev}>
          Vissza a szállításhoz
        </button>
        <button className="p-3 bg-sky-300 w-full lg:w-auto rounded" type={'submit'}>
          Tovább az összegzéshez
        </button>
      </div>
    </form>
  );
}
