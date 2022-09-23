import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useCart } from '../../context/CartContext';

type FormInput = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  shipping: 'personal-pick-up' | 'post';
  postcode: string;
  city: string;
  address: string;
  subaddress: string;
};

type ShippingFormProps = {
  nextStep: () => void;
};

export default function ShippingForm({ nextStep }: ShippingFormProps) {
  const { register, handleSubmit, watch } = useForm<FormInput>();
  const shipping = watch('shipping');
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data);
    nextStep();
  };

  const { updateShippingCost } = useCart();

  useEffect(() => {
    switch (shipping) {
      case 'post':
        updateShippingCost(600);

        break;

      default:
        updateShippingCost(0);
        break;
    }
  }, [shipping]);

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
            <input {...register('shipping')} id="personal-pick-up" type="radio" value={'personal-pick-up'} required />
            <span className="ml-2"> Személyes átvétel</span>
            <span className="ml-2">- Nagykovácsi Kazal utca 6.</span>
          </label>
          <div className="font-bold">Ingyenes</div>
        </div>

        <div className="col-span-full flex justify-between">
          <label htmlFor="post">
            <input {...register('shipping')} id="post" type="radio" value={'post'} required />
            <span className="ml-2"> Postai utánvét</span>
          </label>

          <div className="font-bold">Várható költség:</div>
        </div>

        {/* Required for shipping */}
        {shipping === 'post' && (
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
