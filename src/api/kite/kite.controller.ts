import { Request, Response, Router } from 'express';

import { Kite } from './kite.model';
import * as KiteService from './kite.service';

const router = Router();

router.get<{}, Kite[]>('/', async (req: Request, res: Response<Kite[]>, next) => {
  try {
    const kites = await KiteService.findAll();
    res.json(kites);
  } catch (error) {
    next(error);
  }
});

export default router;
