import { Request, Response, Router } from 'express';

import { Kite } from './kite.model';
import * as kiteService from './kite.service';

const router = Router();

router.get<{}, Kite[]>('/', async (req: Request, res: Response<Kite[]>, next) => {
  try {
    const kites = await kiteService.findAll();
    res.json(kites);
  } catch (error) {
    next(error);
  }
});

export default router;
