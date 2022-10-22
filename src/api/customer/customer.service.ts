import { QueryConfig } from 'pg';
import { db } from '../../db';
import { Customer } from './customer.model';

export async function deleteCustomer(email: string): Promise<Customer> {
  const query: QueryConfig = {
    text: 'DELETE FROM "customers" WHERE "email" = $1 RETURNING *',
    values: [email],
  };

  const { rows } = await db.query<Customer>(query);
  return rows[0];
}
