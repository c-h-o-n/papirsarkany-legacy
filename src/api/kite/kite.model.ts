import { z } from 'zod';
import { Product } from '../product/product.model';

export const Kite = Product.extend({
  category: z.literal('Egyzsinóros'),
});

export type Kite = z.infer<typeof Kite>;
