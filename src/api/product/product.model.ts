import { z } from 'zod';
import { UUID } from '../../interfaces/UUID';

export const Product = z.object({
  id: UUID.optional(),
  name: z.string().min(1),
  imageUrl: z.string().optional(),
  price: z.number().positive(),
});

export type Product = z.infer<typeof Product>;
