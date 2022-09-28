export type CheckoutFormInput = {
  contact: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
  shipping: {
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
  comment: string;
};
