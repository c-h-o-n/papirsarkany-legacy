import { SubmitHandler, useForm } from 'react-hook-form';

export type FormInput = {
  paymentMode: 'upon-receipt' | 'bank-transfer';
};

export default function PayingForm() {
  const { register, handleSubmit, watch } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Upon receipt   */}
      <div>
        <label htmlFor="upon-receipt">
          <input {...register('paymentMode')} id="upon-receipt" type="radio" value={'upon-receipt'} required />
          <span className="ml-2">Átvételkor készpénzel</span>
        </label>
      </div>

      {/* Bank transfer */}
      <div>
        <label htmlFor="bank-transfer">
          <input {...register('paymentMode')} id="bank-transfer" type="radio" value={'bank-transfer'} required />
          <span className="ml-2">Előreutalással</span>
        </label>
      </div>

      <button type={'submit'} className="p-4 bg-blue-400">
        Tovább az összegzéshez
      </button>
    </form>
  );
}
