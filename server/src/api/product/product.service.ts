import { QueryConfig } from 'pg';

import { db } from '../../db';

import { Product } from './product.model';

export async function findAll(): Promise<Product[]> {
  const query: QueryConfig = {
    text: 'SELECT * from "products" WHERE deletedat IS NULL;',
  };

  const { rows } = await db.query<Product>(query);
  return rows;
}

// LATER this has been implemented 3 times
export async function getProduct(id: string): Promise<Product> {
  const query: QueryConfig = {
    text: 'SELECT * FROM "products" WHERE id = $1 AND deletedat IS NULL;',
    values: [id],
  };

  const { rows } = await db.query(query);
  return rows[0];
}
