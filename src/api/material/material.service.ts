import { QueryConfig } from 'pg';
import { db } from '../../db';
import { insertQueryBuilder, updateQueryBuilder } from '../../utilities/queryBuilders';
import { Material } from './material.model';

export async function createMaterial(data: Omit<Material, 'id'>): Promise<Material> {
  const query: QueryConfig = {
    text: insertQueryBuilder('products', data),
    values: Object.values(data),
  };

  const { rows } = await db.query<Material>(query);
  return rows[0];
}

export async function getAllMaterial(): Promise<Material[]> {
  const query: QueryConfig<[Material['category']]> = {
    text: 'SELECT * from "products" WHERE "category" = $1;',
    values: ['Anyag'],
  };
  const { rows } = await db.query<Material>(query);
  return rows;
}

export async function getMaterial(id: string): Promise<Material> {
  const query: QueryConfig = {
    text: 'SELECT * FROM "products" WHERE id = $1;',
    values: [id],
  };

  const { rows } = await db.query<Material>(query);
  return rows[0];
}

export async function updateMaterial(id: string, data: Omit<Material, 'id'>): Promise<Material> {
  const query: QueryConfig = {
    text: updateQueryBuilder('products', data),
    values: [...Object.values(data), id],
  };

  const { rows } = await db.query<Material>(query);
  return rows[0];
}

export async function deleteMaterial(id: string): Promise<Material> {
  const query: QueryConfig = {
    text: 'DELETE FROM "products" WHERE id = $1 RETURNING *',
    values: [id],
  };
  const { rows } = await db.query<Material>(query);

  return rows[0];
}
