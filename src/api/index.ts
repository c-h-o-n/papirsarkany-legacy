import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';

import kite from './kite/kite.controller';
import material from './material/material.controller';
import product from './product/product.controller';
import order from './order/order.controller';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏🪁',
  });
});

router.use('/kites', kite);
router.use('/materials', material);
router.use('/products', product);
router.use('/orders', order);

export default router;
