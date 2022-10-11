import { NextFunction, Request, Response, Router } from 'express';

import { validateRequest } from '../middlewares/validateRequest';

import { Kite } from './kite.model';
import * as kiteService from './kite.service';
import { UUID } from '../../interfaces/UUID';

const router = Router();

// Create kite
router.post(
  '/',
  validateRequest({ body: Kite }),
  async (req: Request<{}, Kite, Omit<Kite, 'id'>>, res: Response<Kite>, next: NextFunction) => {
    try {
      const kite = await kiteService.createKite(req.body);
      res.status(201);
      res.json(kite);
    } catch (error) {
      next(error);
    }
  }
);

// Get all kites
router.get('/', async (req: Request, res: Response<Kite[]>, next: NextFunction) => {
  try {
    const kites = await kiteService.getAllKites();
    res.json(kites);
  } catch (error) {
    next(error);
  }
});

// Get kite
router.get(
  '/:id',
  validateRequest({ params: UUID }),
  async (req: Request<{ id: string }>, res: Response<Kite>, next: NextFunction) => {
    try {
      const kite = await kiteService.getKite(req.params.id);
      if (!kite) {
        res.status(404);
        throw new Error(`Kite with id ${req.params.id} not found!`);
      }
      res.json(kite);
    } catch (error) {
      next(error);
    }
  }
);

// Update kite
router.put(
  '/:id',
  validateRequest({ params: UUID, body: Kite }),
  async (req: Request<{ id: string }, Kite, Omit<Kite, 'id'>>, res: Response<Kite>, next: NextFunction) => {
    try {
      const kite = await kiteService.updateKite(req.params.id, req.body);
      console.log(kite);
      if (!kite) {
        res.status(404);
        throw new Error(`Kite with id ${req.params.id} not found!`);
      }
      res.json(kite);
    } catch (error) {
      next(error);
    }
  }
);

// Delete kite;
router.delete(
  '/:id',
  validateRequest({ params: UUID }),
  async (req: Request<{ id: string }>, res: Response<Kite | 'Kite not found!'>, next) => {
    try {
      const kite = await kiteService.deleteKite(req.params.id);
      if (!kite) {
        res.status(404);
        throw new Error(`Kite with id ${req.params.id} not found!`);
      }

      res.json(kite);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
