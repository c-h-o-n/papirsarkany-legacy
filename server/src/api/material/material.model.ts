import { z } from 'zod';
import { Product } from '../product/product.model';

export const Material = Product.extend({
  category: z.literal('Anyag'),
  details: z
    .object({
      materialCategory: z.string(),
      lengths: z.array(z.string()).optional(),
    })
    .optional(),
});

export type Material = z.infer<typeof Material>;
