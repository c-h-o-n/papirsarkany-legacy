import request from 'supertest';

import app from '../../app';

describe('GET /api/v1/products', () => {
  it('responds with an array of products', async () =>
    request(app)
      .get('/api/v1/products')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toHaveProperty('length');
      }));
});
