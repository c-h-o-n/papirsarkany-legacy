import request from 'supertest';

import app from '../app';

describe('GET /api/v1', () => {
  it('responds with a json message', async () => {
    const response = await request(app).get('/api/v1').set('Accept', 'application/json');

    expect(response.type).toBe('application/json');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'API - 👋🌎🌍🌏🪁');
  });
});
