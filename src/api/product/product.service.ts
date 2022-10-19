import { QueryConfig } from 'pg';

import { db } from '../../db';

import { Product } from './product.model';

export async function findAll(): Promise<Product[]> {
  const query: QueryConfig = {
    text: 'SELECT * from "products"',
  };

  const { rows } = await db.query<Product>(query);
  return rows;
}
