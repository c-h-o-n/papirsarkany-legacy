type TableName = 'customers' | 'orders' | 'order_items' | 'products';

export function insertQueryBuilder(table: TableName, columns: object) {
  const query = [`INSERT INTO ${table}(`];

  const into: string[] = [];
  Object.keys(columns).map(key => into.push(`"${key}"`));
  query.push(into.join(', '));
  query.push(')');

  query.push('VALUES(');
  const values: string[] = [];
  into.map((key, i) => values.push(`$${i + 1}`));
  query.push(values.join(', '));
  query.push(')');

  query.push('RETURNING *');
  query.push(';');

  console.log(query.join(' '));

  return query.join(' ');
}

export function upsertQueryBuilder(table: TableName, columns: object, conflictTarget: string) {
  const query = [`INSERT INTO ${table}(`];

  const into: string[] = [];
  Object.keys(columns).map(key => into.push(`"${key}"`));
  query.push(into.join(', '));
  query.push(')');

  query.push('VALUES(');
  const values: string[] = [];
  into.map((key, i) => values.push(`$${i + 1}`));
  query.push(values.join(', '));
  query.push(')');

  query.push(`ON CONFLICT (${conflictTarget}) DO UPDATE SET`);

  const set: string[] = [];
  Object.keys(columns).map((key, i) => set.push(`"${key}" = $${i + 1}`));
  query.push(set.join(', '));

  query.push('RETURNING *');
  query.push(';');

  console.log(query.join(' '));

  return query.join(' ');
}

export function updateQueryBuilder(table: TableName, columns: object, where: string = 'id') {
  const query = [`UPDATE ${table}`];

  query.push('SET');
  const set: string[] = [];
  Object.keys(columns).map((key, i) => set.push(`"${key}" = $${i + 1}`));
  query.push(set.join(', '));

  query.push(`WHERE "${where}" = $${set.length + 1}`);

  query.push('RETURNING *');
  query.push(';');

  console.log(query.join(' '));
  return query.join(' ');
}
