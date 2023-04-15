import { z } from 'zod';
import { Product } from '../product/product.model';

export const Kite = Product.extend({
  category: z.literal('Egyzsinóros'),
  details: z
    .object({
      dimensions: z.string(),
      materials: z.string(),
      wind: z.string(),
      isBeginner: z.boolean(),
    })
    .optional(),
});

export type Kite = z.infer<typeof Kite>;
