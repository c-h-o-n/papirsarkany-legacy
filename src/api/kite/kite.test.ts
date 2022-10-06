import request from 'supertest';

import app from '../../app';

// TODO full crud test

describe('GET /api/v1/kites', () => {
  it('responds with an array of kites', async () =>
    request(app)
      .get('/api/v1/kites')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('length');
      }));
});
