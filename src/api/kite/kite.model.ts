import { z } from 'zod';
import { Product } from '../product/product.model';

export const Kite = Product.extend({
  dimensions: z.string(),
  materials: z.string(),
  wind: z.string(),
  isBeginner: z.boolean(),
  details: z.string(),
});

export type Kite = z.infer<typeof Kite>;
