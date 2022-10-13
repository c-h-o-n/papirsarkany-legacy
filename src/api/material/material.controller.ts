import { NextFunction, Request, Response, Router } from 'express';

import { validateRequest } from '../middlewares/validateRequest';
import * as materialService from './material.service';

import { Material } from './material.model';
import { UUID } from '../../interfaces/UUID';

const router = Router();

// Create material
router.post(
  '/',
  validateRequest({ body: Material }),
  async (req: Request<{}>, res: Response<Material>, next: NextFunction) => {
    try {
      const material = await materialService.createMaterial(req.body);
      res.status(201);
      res.json(material);
    } catch (error) {
      next(error);
    }
  }
);

// Get all materials
router.get('/', async (req: Request, res: Response<Material[]>, next: NextFunction) => {
  try {
    const materials = await materialService.getAllMaterial();
    res.json(materials);
  } catch (error) {
    next(error);
  }
});

// Get material
router.get(
  '/:id',
  validateRequest({ params: UUID }),
  async (req: Request<{ id: string }>, res: Response<Material>, next: NextFunction) => {
    try {
      const material = await materialService.getMaterial(req.params.id);
      if (!material) {
        res.status(404);
        throw new Error(`Kite with id ${req.params.id} not found!`);
      }
      res.json(material);
    } catch (error) {
      next(error);
    }
  }
);

// Update material
router.put(
  '/:id',
  validateRequest({ params: UUID }),
  async (req: Request<{ id: string }, Material, Material>, res: Response<Material>, next: NextFunction) => {
    try {
      const material = await materialService.updateMaterial(req.params.id, req.body);
      console.log(material);
      if (!material) {
        res.status(404);
        throw new Error(`Kite with id ${req.params.id} not found!`);
      }
      res.json(material);
    } catch (error) {
      next(error);
    }
  }
);
// Delete material
router.delete(
  '/:id',
  validateRequest({ params: UUID }),
  async (req: Request<{ id: string }>, res: Response<Material>, next) => {
    try {
      const kite = await materialService.deleteMaterial(req.params.id);
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
