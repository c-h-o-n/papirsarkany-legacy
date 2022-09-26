import { SubmitHandler, useForm } from 'react-hook-form';
import { useSteps } from 'react-step-builder';
import { useCart } from '../../context/CartContext';
import { CheckoutFormInput } from '../../types/CheckoutFormInput';

type FormInput = { comment: CheckoutFormInput['comment'] };

type OrderFormProps = {
  formValues: CheckoutFormInput;
  resetFormValues: () => void;
};

export default function OrderForm({ formValues, resetFormValues }: OrderFormProps) {
  const { register, handleSubmit } = useForm<FormInput>({ defaultValues: { comment: formValues.comment } });
  const { removeAllItemFormCart } = useCart();
  const { next } = useSteps();

  // TODO post {...formValues, ...data}
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    resetFormValues();
    removeAllItemFormCart();
    next();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="comment" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        Megjegyzés
        <textarea
          {...register('comment')}
          id="comment"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </label>

      <button type={'submit'} className="p-4 bg-green-400">
        Megrendelem
      </button>
    </form>
  );
}
