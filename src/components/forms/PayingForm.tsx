import { SubmitHandler, useForm } from 'react-hook-form';
import { useSteps } from 'react-step-builder';

import { CheckoutFormInput } from '../../types/CheckoutFormInput';

type FormInput = CheckoutFormInput['billing'];

type PayingFormProps = {
  formValues: CheckoutFormInput['billing'];
  updateFormValues: (values: Partial<CheckoutFormInput>) => void;
};

export default function PayingForm({ formValues, updateFormValues }: PayingFormProps) {
  const { next } = useSteps();

  const { register, handleSubmit } = useForm<FormInput>({
    defaultValues: {
      postcode: formValues.postcode,
      city: formValues.city,
      address: formValues.address,
      subaddress: formValues.subaddress,
      mode: formValues.mode,
    },
  });

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    updateFormValues({
      billing: {
        address: data.address,
        city: data.city,
        postcode: data.postcode,
        subaddress: data.subaddress,
        mode: data.mode,
      },
    });
    next();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-x-2 gap-y-4 grid-cols-4">
        <div className="col-span-full">Fizetési módok</div>
        {/* Upon receipt   */}
        <div className="col-span-full">
          <label htmlFor="upon-receipt">
            <input {...register('mode')} id="upon-receipt" type="radio" value={'Átvételkor készpénzel'} required />
            <span className="ml-2">Átvételkor készpénzel</span>
          </label>
        </div>

        {/* Bank transfer */}
        <div className="col-span-full">
          <label htmlFor="bank-transfer">
            <input {...register('mode')} id="bank-transfer" type="radio" value={'Előreutalással'} required />
            <span className="ml-2">Előreutalással</span>
          </label>
        </div>

        <div className="col-span-full">Számlázási cím</div>

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
      </div>

      <button type={'submit'} className="p-4 bg-blue-400">
        Tovább az összegzéshez
      </button>
    </form>
  );
}
