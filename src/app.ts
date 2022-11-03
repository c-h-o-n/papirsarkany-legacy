import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
require('dotenv').config();

import { notFound } from './api/middlewares/notFound';
import { errorHandler } from './api/middlewares/errorHandler';
import api from './api';
import path from 'path';

import MessageResponse from './interfaces/MessageResponse';

const app = express();

app.use(morgan('dev'));
app.use(helmet({ crossOriginResourcePolicy: {policy: 'cross-origin'}}));
app.use(cors());
app.use(express.json());

app.disable('etag');

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'Go out and fly kites! 🪁 or use (/api/v1)',
  });
});

app.use('/api/v1', api);
app.use('/static', express.static(path.join(__dirname + '/public')));

app.use(notFound);
app.use(errorHandler);

export default app;
