import request from 'supertest';

import app from './app';

describe('app', () => {
  it('responds with a not found message', async () => {
    const response = await request(app).get('/what-is-this-even').set('Accept', 'application/json');

    expect(response.type).toBe('application/json');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('stack');
  });
});

describe('GET /', () => {
  it('responds with a json message', async () => {
    const response = await request(app).get('/').set('Accept', 'application/json');

    expect(response.type).toBe('application/json');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Go out and fly kites! 🪁 or use (/api/v1)');
  });
});
