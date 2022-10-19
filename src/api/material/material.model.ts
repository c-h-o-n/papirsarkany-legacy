import { z } from 'zod';
import { Product } from '../product/product.model';

export const Material = Product.extend({
  category: z.literal('Anyag'),
});

export type Material = z.infer<typeof Material>;
