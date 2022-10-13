import request from 'supertest';

import app from '../../app';

describe('GET /api/v1/products', () => {
  it('responds with an array of products', async () => {
    const response = await request(app).get('/api/v1/products').set('Accept', 'application/json');

    expect(response.type).toBe('application/json');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('length');
  });
});
