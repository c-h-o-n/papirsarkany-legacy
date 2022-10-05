import { db } from '../../db';
import { Kite } from '../kite/kite.model';
import { Product } from './product.model';

export async function findAll(): Promise<Product[]> {
  const { rows: kiteRows } = await db.query<Kite>('SELECT id, name, imageUrl, price  from "kite"');
  const { rows: materialRows } = await db.query<any>('SELECT id, name, imageUrl, price  from "materials"');

  return [...kiteRows, ...materialRows];
}
