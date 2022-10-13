import { QueryConfig } from 'pg';

import { db } from '../../db';

import { insertQueryBuilder, updateQueryBuilder } from '../../utilities/queryBuilders';
import { Kite } from './kite.model';

export async function createKite(data: Omit<Kite, 'id'>): Promise<Kite> {
  const query: QueryConfig = {
    text: insertQueryBuilder('kites', data),
    values: Object.values(data),
  };

  const { rows } = await db.query(query);
  return rows[0];
}

export async function getAllKites(): Promise<Kite[]> {
  const { rows } = await db.query<Kite>('SELECT * from "kites"');
  return rows;
}

export async function getKite(id: string): Promise<Kite> {
  const query: QueryConfig = {
    text: 'SELECT * FROM "kites" WHERE id = $1',
    values: [id],
  };

  const { rows } = await db.query(query);
  return rows[0];
}

export async function updateKite(id: string, data: Omit<Kite, 'id'>): Promise<Kite> {
  const query: QueryConfig = {
    text: updateQueryBuilder('kites', data),
    values: [...Object.values(data), id],
  };

  const { rows } = await db.query<Kite>(query);
  return rows[0];
}

export async function deleteKite(id: string): Promise<Kite> {
  const query: QueryConfig = {
    text: 'DELETE FROM "kites" WHERE id = $1 RETURNING *',
    values: [id],
  };
  const { rows } = await db.query<Kite>(query);

  return rows[0];
}
