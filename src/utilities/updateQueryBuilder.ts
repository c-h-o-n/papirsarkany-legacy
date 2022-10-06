export function updateQueryBuilder(table: string, columns: any) {
  var query = ['UPDATE ' + table];
  query.push('SET');

  const set: any[] = [];
  Object.keys(columns).forEach(function (key, i) {
    set.push(key + ' = $' + (i + 1));
  });

  console.log(columns);

  query.push(set.join(', '));

  query.push('WHERE id = $' + (set.length + 1));
  query.push('RETURNING *');

  return query.join(' ');
}
