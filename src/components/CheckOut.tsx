import { useForm, SubmitHandler } from 'react-hook-form';

type FormInput = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  subaddress: string;
  postcode: string;
  city: string;
  phone: string;
};

export default function CheckOut() {
  const { register, handleSubmit } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-x-2 gap-y-6 grid-cols-4 ">
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

        <div className="col-span-2">
          <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Keresztnév
            <input
              {...register('firstName')}
              type="firstName"
              id="firstName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="keresztnév"
              required
            />
          </label>
        </div>

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
              type="city"
              id="city"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="város"
              required
            />
          </label>
        </div>
      </div>

      <input type="submit" className="bg-green-400 p-2" value="💵 Pay!" />
    </form>
  );
}
