import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSteps } from 'react-step-builder';
import { useCart } from '../../context/CartContext';
import { useApi } from '../../hooks/useApi';
import { CheckoutFormInput } from '../../types/CheckoutFormInput';
import { Order } from '../../types/Order';

type FormInput = Pick<CheckoutFormInput, 'comment'>;

type OrderFormProps = {
  formValues: CheckoutFormInput;
};

export default function OrderForm({ formValues }: OrderFormProps) {
  const { register, handleSubmit, reset } = useForm<FormInput>({ defaultValues: { comment: formValues.comment } });
  const { removeAllItemFormCart, cartItems } = useCart();
  const { next, prev } = useSteps();
  const { postOrder } = useApi();

  const mutation = useMutation<Order, Error, Order>((newOrder) => postOrder(newOrder), {
    onSuccess: () => {
      reset();
      removeAllItemFormCart();
      next();
    },
  });

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    const orderToSend: Order = { ...formValues, ...data, products: [...cartItems] };

    mutation.mutate(orderToSend);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="comment" className="`block mb-6 text-sm font-medium` text-gray-900 dark:text-gray-300">
        Megjegyzés
        <textarea
          {...register('comment')}
          id="comment"
          className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </label>

      <div className="flex flex-wrap justify-between gap-4">
        <button className="p-3 bg-gray-200 w-full lg:w-auto rounded order-1 lg:-order-1" type={'button'} onClick={prev}>
          Vissza a fizetési adatokhoz
        </button>
        <button className="p-3 bg-green-400 w-full lg:w-auto rounded" type={'submit'} disabled={mutation.isLoading}>
          Megrendelem
        </button>
      </div>
    </form>
  );
}
