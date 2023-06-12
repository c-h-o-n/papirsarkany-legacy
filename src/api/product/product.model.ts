import { z } from 'zod';

export const Product = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1),
  imageUrl: z.string().optional(),
  price: z.number().positive(),
  category: z.enum(['Egyzsinóros', 'Anyag']),
  description: z.string().optional(),
  deletedat: z.string().optional(),
});

export type Product = z.infer<typeof Product>;
