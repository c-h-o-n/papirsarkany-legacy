import { z } from 'zod';
import { NewOrder } from '../api/order/order.model';
import { Product } from '../api/product/product.model';

export const OrderMail = NewOrder.extend({
  subject: z.string(),
  products: z.array(
    Product.extend({
      quantity: z.number().positive(),
    })
  ),
  total: z.string(),
});

export type OrderMail = z.infer<typeof OrderMail>;
