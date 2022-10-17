import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSteps } from 'react-step-builder';

import { useCart } from '../../context/CartContext';

import { CheckoutFormInput } from '../../types/CheckoutFormInput';

type FormInput = CheckoutFormInput['contact'] & CheckoutFormInput['shipping'];

type ShippingFormProps = {
  formValues: CheckoutFormInput;
  updateFormValues: (values: Partial<CheckoutFormInput>) => void;
};

export default function ShippingForm({ formValues, updateFormValues }: ShippingFormProps) {
  const { next, prev } = useSteps();

  const { updateShippingCost } = useCart();

  const { register, handleSubmit, watch } = useForm<FormInput>({
    defaultValues: {
      email: formValues.contact.email,
      lastName: formValues.contact.lastName,
      firstName: formValues.contact.firstName,
      phone: formValues.contact.phone,
      postcode: formValues.shipping.postcode,
      city: formValues.shipping.city,
      address: formValues.shipping.address,
      subaddress: formValues.shipping.subaddress,
      mode: formValues.shipping.mode,
    },
  });
  const shippingMode = watch('mode');

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    updateFormValues({
      contact: {
        email: data.email,
        lastName: data.lastName,
        firstName: data.firstName,
        phone: data.phone,
      },
      shipping: {
        postcode: data.postcode,
        city: data.city,
        address: data.address,
        subaddress: data.subaddress,
        mode: data.mode,
      },
      billing: {
        postcode: data.postcode,
        city: data.city,
        address: data.address,
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
      case 'Személyes átvétel':
        updateShippingCost(0);
        break;
      default:
        updateShippingCost(undefined);
        break;
    }
  }, [shippingMode, updateShippingCost]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-x-2 gap-y-4 grid-cols-4 mb-6">
        <div className="col-span-full text-lg underline">Szállítás</div>

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
              autoComplete="family-name"
              type={'text'}
              id="lastName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="last name"
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
              autoComplete="given-name"
              type={'text'}
              id="firstName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="first name"
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
        <div className="col-span-full flex justify-between items-center">
          <label htmlFor="personal-pick-up">
            <input {...register('mode')} id="personal-pick-up" type="radio" value={'Személyes átvétel'} required />
            <span className="ml-2"> Személyes átvétel</span>
            <span className="ml-2">- Nagykovácsi Kazal utca 6.</span>
          </label>
          <div className="font-bold">Ingyenes</div>
        </div>

        <div className="col-span-full flex justify-between items-center">
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
                  type={'text'}
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
          Vissza a kosárhoz
        </button>
        <button className="p-3 bg-green-400 w-full lg:w-auto rounded" type={'submit'}>
          Tovább a fizetéshez
        </button>
      </div>
    </form>
  );
}
