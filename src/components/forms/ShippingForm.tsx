import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSteps } from 'react-step-builder';

import { useCart } from '../../context/CartContext';

import { CheckoutFormInput } from '../../types/CheckoutFormInput';

type FormInput = CheckoutFormInput['shipping'];

type ShippingFormProps = {
  formValues: CheckoutFormInput['shipping'];
  updateFormValues: (values: Partial<CheckoutFormInput>) => void;
};

export default function ShippingForm({ formValues, updateFormValues }: ShippingFormProps) {
  const { next } = useSteps();

  const { updateShippingCost } = useCart();

  const { register, handleSubmit, watch } = useForm<FormInput>({
    defaultValues: {
      email: formValues.email,
      lastName: formValues.lastName,
      firstName: formValues.firstName,
      phone: formValues.phone,
      postcode: formValues.postcode,
      city: formValues.city,
      address: formValues.address,
      subaddress: formValues.subaddress,
      mode: formValues.mode,
    },
  });
  const shippingMode = watch('mode');

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    updateFormValues({
      shipping: data,
      billing: {
        address: data.address,
        city: data.city,
        postcode: data.postcode,
        subaddress: data.subaddress,
        mode: '',
      },
    });
    next();
  };

  useEffect(() => {
    switch (shippingMode) {
      case 'Postai szállítás':
        updateShippingCost(600);
        break;
      default:
        updateShippingCost(0);
        break;
    }
  }, [shippingMode, updateShippingCost]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-x-2 gap-y-4 grid-cols-4">
        {/* E-mail */}
        <div className="col-span-full">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Email
            <input
              {...register('email')}
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="email"
              required
            />
          </label>
        </div>

        {/* Last name */}
        <div className="col-span-2">
          <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Vezetéknév
            <input
              {...register('lastName')}
              type="lastName"
              id="lastName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="vezetéknév"
              required
            />
          </label>
        </div>

        {/* First name */}
        <div className="col-span-2">
          <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Keresztnév
            <input
              {...register('firstName')}
              type="firstName"
              id="firstName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </label>
        </div>

        {/* Telephone */}
        <div className="col-span-full">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Telefonszám
            <input
              {...register('phone')}
              type={'tel'}
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="+36201234567"
              required
            />
          </label>
        </div>

        {/* Shipping options */}
        <div className="col-span-full flex justify-between">
          <label htmlFor="personal-pick-up">
            <input {...register('mode')} id="personal-pick-up" type="radio" value={'Személyes átvétel'} required />
            <span className="ml-2"> Személyes átvétel</span>
            <span className="ml-2">- Nagykovácsi Kazal utca 6.</span>
          </label>
          <div className="font-bold">Ingyenes</div>
        </div>

        <div className="col-span-full flex justify-between">
          <label htmlFor="post">
            <input {...register('mode')} id="post" type="radio" value={'Postai szállítás'} required />
            <span className="ml-2"> Postai szállítás</span>
          </label>

          <div className="font-bold">Várható költség:</div>
        </div>

        {/* Required for shipping */}
        {shippingMode === 'Postai szállítás' && (
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

      <button type={'submit'} className="bg-green-400 p-2">
        💵 Tovább a fizetéshez!
      </button>
    </form>
  );
}
