import { z } from 'zod';

export const UUID = z.object({
  id: z.string().uuid(),
});

export type UUID = z.infer<typeof UUID>;
