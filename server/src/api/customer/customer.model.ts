import { z } from 'zod';

// "id" UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),

// "email" text NOT NULL UNIQUE,
// "firstName" text NOT NULL,
// "lastName" text NOT NULL,
// "phone" text NOT NULL,

// "shippingPostcode" text NOT NULL,
// "shippingCity" text NOT NULL,
// "shippingAddress" text NOT NULL,
// "shippingSubaddress" text NOT NULL,

// "billingPostcode" text NOT NULL,
// "billingCity" text NOT NULL,
// "billingAddress" text NOT NULL,
// "billingSubaddress" text NOT NULL

const phoneNumberRegexp = /^((?:\+?3|0)6)(\d{9})$/;
const postCodeRegexp = /^\d{4}$|^$/;

export const Customer = z.object({
  id: z.string().uuid(),

  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().regex(phoneNumberRegexp),

  shippingPostcode: z.string().regex(postCodeRegexp),
  shippingCity: z.string(),
  shippingAddress: z.string(),
  shippingSubaddress: z.string(),

  billingPostcode: z.string().regex(postCodeRegexp),
  billingCity: z.string(),
  billingAddress: z.string(),
  billingSubaddress: z.string(),
});

export type Customer = z.infer<typeof Customer>;
