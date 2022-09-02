import { z } from 'zod';

const Kite = z.object({
  id: z.number(),
  name: z.string(),
  imageUrl: z.string(),
  dimensions: z.string(),
  materials: z.string(),
  wind: z.string(),
  isBeginner: z.boolean(),
  details: z.string(),
  price: z.number(),
});

export type Kite = z.infer<typeof Kite>;
