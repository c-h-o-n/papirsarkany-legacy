import { Request, Response, Router } from 'express';
import { z } from 'zod';
import { validateRequest } from '../middlewares/validateRequest';
import { Customer } from './customer.model';
import { deleteCustomer } from './customer.service';

const router = Router();

// Delete customer by email
router.delete(
  '/:email',
  validateRequest({ params: z.object({ email: z.string().email() }) }),
  async (req: Request<{ email: string }>, res: Response<Customer>, next) => {
    try {
      const customer = await deleteCustomer(req.params.email);
      if (!customer) {
        res.status(404);
        throw new Error(`Customer with email ${req.params.email} not found!`);
      }

      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
