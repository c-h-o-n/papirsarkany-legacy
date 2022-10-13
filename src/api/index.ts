import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';

import kite from './kite/kite.controller';
import product from './product/product.controller';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏🪁',
  });
});

router.use('/kites', kite);
router.use('/products', product);

export default router;
