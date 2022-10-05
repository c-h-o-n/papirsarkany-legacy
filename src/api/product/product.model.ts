import { z } from 'zod';

export const Product = z.object({
  id: z.string(),
  name: z.string(),
  imageUrl: z.string().optional(),
  price: z.number(),
});

export type Product = z.infer<typeof Product>;
