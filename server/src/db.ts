import { Pool } from 'pg';

const { DATABASE_URL } = process.env;

export const db = new Pool({ connectionString: DATABASE_URL });
