import { z } from 'zod';
import { Product } from '../product/product.model';

export const Material = Product.extend({
  category: z.union([
    z.literal('Zsinórtartók'),
    z.literal('Pálcák, rudak'),
    z.literal('Karboncsövek'),
    z.literal('Trevira zsinórok'),
  ]),
  diameter: z.number().optional(),
  availableLengths: z.number().array().optional(),
  details: z.string().optional(),
});

export type Material = z.infer<typeof Material>;
