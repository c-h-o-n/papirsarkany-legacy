import { CheckoutFormInput } from '../types/CheckoutFormInput';

type CheckoutFormSummaryProps = {
  formValues: CheckoutFormInput;
};

export default function CheckoutFormSummary({ formValues }: CheckoutFormSummaryProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-evenly break-all">
      <div className="w-full  md:max-w-xs bg-white rounded-3xl shadow-md p-6 relative">
        <div className="underline text-lg">Elérhetőség</div>
        <div>
          {formValues.shipping.lastName} {formValues.shipping.firstName}
        </div>
        <div>{formValues.shipping.email}</div>
        <div>{formValues.shipping.phone}</div>
      </div>
      <div className="w-full  md:max-w-xs bg-white rounded-3xl shadow-md p-6 relative">
        <div className="underline text-lg">Szállítás</div>
        <div className="font-bold">{formValues.shipping.mode}</div>
        <div>{formValues.shipping.postcode}</div>
        <div>{formValues.shipping.city}</div>
        <div>{formValues.shipping.address}</div>
        <div>{formValues.shipping.subaddress}</div>
      </div>
      <div className="  w-full  md:max-w-xs bg-white rounded-3xl shadow-md p-6 relative">
        <div className="underline text-lg">Fizetés</div>
        <div className="font-bold">{formValues.billing.mode}</div>
        <div>{formValues.billing.postcode}</div>
        <div>{formValues.billing.city}</div>
        <div>{formValues.billing.address}</div>
        <div>{formValues.billing.subaddress}</div>
      </div>
    </div>
  );
}
