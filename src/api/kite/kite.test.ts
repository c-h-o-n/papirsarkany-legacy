import request from 'supertest';

import app from '../../app';

// TODO full crud test
// Get all kites
describe('GET /api/v1/kites', () => {
  it('responds with an array of kites', async () => {
    const response = await request(app).get('/api/v1/kites').set('Accept', 'application/json');

    expect(response.type).toBe('application/json');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('length');
  });
});
