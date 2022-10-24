type ShippingOption = 'Személyes átvétel' | 'Postai szállítás' | '';
type PaymentOption = 'Átvételkor készpénzel' | 'Előreutalással' | '';

export type CheckoutFormInput = {
  contact: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };

  shippingOption: ShippingOption;
  paymentOption: PaymentOption;

  shipping: {
    postcode: string;
    city: string;
    address: string;
    subaddress: string;
  };
  billing: {
    postcode: string;
    city: string;
    address: string;
    subaddress: string;
  };
  comment: string;
};
