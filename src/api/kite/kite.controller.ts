import { Request, Response, Router } from 'express';

import { Kite } from './kite.model';
import * as kiteService from './kite.service';

const router = Router();

// Create kite
router.post('/', async (req: Request<{}, Omit<Kite, 'id'>>, res: Response<Kite>, next) => {
  try {
    const kite = await kiteService.createKite(req.body);
    res.status(201);
    res.json(kite);
  } catch (error) {
    next(error);
  }
});

// Get kite
router.get('/:id', async (req: Request<{ id: string }>, res: Response<Kite>, next) => {
  try {
    const kite = await kiteService.getKite(req.params.id);
    res.json(kite);
  } catch (error) {
    next(error);
  }
});

// Get all kites
router.get('/', async (req: Request, res: Response<Kite[]>, next) => {
  try {
    const kites = await kiteService.getAllKites();
    res.json(kites);
  } catch (error) {
    next(error);
  }
});

// Update kite
router.patch('/:id', async (req: Request<{ id: string }>, res: Response<Kite>, next) => {
  try {
    const kite = await kiteService.updateKite(req.params.id, req.body);
    res.json(kite);
  } catch (error) {
    next(error);
  }
});

// Delete kite;
router.delete('/:id', async (req: Request<{ id: string }>, res: Response<Kite | 'Kite not found!'>, next) => {
  try {
    const kite = await kiteService.deleteKite(req.params.id);
    if (!kite) {
      res.status(404);
      throw new Error('Kite not found!');
    }

    res.json(kite);
  } catch (error) {
    next(error);
  }
});

export default router;
