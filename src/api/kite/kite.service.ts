import { Request, Response } from 'express';
import { db } from '../../db';

import { Kite } from './kite.model';

export async function findAll() {
  const { rows } = await db.query<Kite>('SELECT * from "kites"');
  throw new Error('I like big boobs');
  return rows;
}
