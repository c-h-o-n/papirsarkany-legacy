import { db } from './db';

// runs after all the tests have completed
global.afterAll(async () => {
  await db.end();
});
