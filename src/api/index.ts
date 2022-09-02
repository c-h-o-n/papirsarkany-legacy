import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';

import kite from './kite/kite.controller';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/kites', kite);

export default router;
