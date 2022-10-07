export function insertQueryBuilder(table: string, columns: object) {
  const query = [`INSERT INTO ${table}(`];

  const into: string[] = [];
  Object.keys(columns).map((key) => into.push(`${key}`));
  query.push(into.join(', '));

  query.push(') VALUES(');
  const values: string[] = [];
  into.map((key, i) => values.push(`$${i + 1}`));
  query.push(values.join(', '));

  query.push(') RETURNING *');

  return query.join('');
}

export function updateQueryBuilder(table: string, columns: object) {
  const query = ['UPDATE ' + table];
  query.push('SET');

  const set: string[] = [];
  Object.keys(columns).map((key, i) => set.push(key + ' = $' + (i + 1)));

  query.push(set.join(', '));

  query.push('WHERE id = $' + (set.length + 1));
  query.push('RETURNING *');

  return query.join(' ');
}
