import { string, z } from 'zod';

const phoneNumberRegexp = /^((?:\+?3|0)6)(\d{9})$/;
const postCodeRegexp = /^\d{4}$|^$/;

export const Order = z.object({
  id: z.number().positive().optional(),

  contact: z.object({
    email: z.string().email(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    phone: z.string().regex(phoneNumberRegexp),
  }),

  shippingOption: z.enum(['Személyes átvétel', 'Postai szállítás']),
  paymentOption: z.enum(['Átvételkor készpénzel', 'Előreutalással']),

  shipping: z.object({
    postcode: z.string().regex(postCodeRegexp),
    city: z.string(),
    address: z.string(),
    subaddress: z.string(),
  }),

  billing: z.object({
    postcode: z.string().regex(postCodeRegexp),
    city: z.string(),
    address: z.string(),
    subaddress: z.string(),
  }),

  comment: string(),

  products: z.array(
    z.object({
      id: z.string().uuid(),
      quantity: z.number().positive(),
    })
  ),
});

export type Order = z.infer<typeof Order>;
