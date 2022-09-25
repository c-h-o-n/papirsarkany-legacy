export type CheckoutFormInput = {
  shipping: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    mode: 'Személyes átvétel' | 'Postai szállítás' | '';
    postcode: string;
    city: string;
    address: string;
    subaddress: string;
  };
  billing: {
    mode: 'Átvételkor készpénzel' | 'Előreutalással' | '';
    postcode: string;
    city: string;
    address: string;
    subaddress: string;
  };
};
