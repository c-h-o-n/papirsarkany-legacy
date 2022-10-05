import { Request, Response, Router } from 'express';
import { Product } from './product.model';
import * as productService from './product.service';

const router = Router();

router.get<{}, Product[]>('/', async (req: Request, res: Response<Product[]>, next) => {
  try {
    const products = await productService.findAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

export default router;
