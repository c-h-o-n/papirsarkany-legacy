import { NextFunction, Request, Response, Router } from 'express';
import { z } from 'zod';
import { UUID } from '../../interfaces/UUID';

import { validateRequest } from '../middlewares/validateRequest';
import { Product } from '../product/product.model';

import { Kite } from './kite.model';
import * as kiteService from './kite.service';

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
router.get('/', async (req: Request, res: Response<Kite[]>, next) => {
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
  async (req: Request<{ id: string }>, res: Response<Kite>, next) => {
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

// TODO implement put
// Update kite
router.patch(
  '/:id',
  validateRequest({ params: UUID }),
  async (req: Request<{ id: string }>, res: Response<Kite>, next) => {
    try {
      const kite = await kiteService.updateKite(req.params.id, req.body);
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
