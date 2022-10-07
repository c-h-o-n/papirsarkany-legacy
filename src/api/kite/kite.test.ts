import request from 'supertest';

import app from '../../app';
import { Kite } from './kite.model';

// TODO create tests for failing usecases
describe('GET /api/v1/kites', () => {
  it('responds with an array of kites', async () => {
    const response = await request(app).get('/api/v1/kites').set('Accept', 'application/json');

    expect(response.type).toBe('application/json');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('length');
  });
});

let id = '';
const kite: Omit<Kite, 'id'> = {
  name: 'kite created with supertest',
  imageUrl: 'no/image',
  dimensions: '30x30cm',
  materials: 'bambusz',
  wind: 'eros',
  isBeginner: true,
  details: 'lorem ipsum',
  price: 13000,
};

describe('POST /api/v1/kites', () => {
  it('responds with an inserted kite', async () => {
    const response = await request(app).post('/api/v1/kites').set('Accept', 'application/json').send(kite);

    expect(response.type).toBe('application/json');
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    Object.keys(kite).map(key => {
      expect(response.body).toHaveProperty(key);
    });

    id = response.body.id;
  });

  it.todo('responds with an error if the kite is invalid');
});

describe('GET /api/v1/kites/:id', () => {
  it('responds with a sinngle kite', async () => {
    const response = await request(app).get(`/api/v1/kites/${id}`).set('Accept', 'application/json');

    expect(response.type).toBe('application/json');
    expect(response.status).toBe(200);
    Object.keys(kite).map(key => {
      expect(response.body).toHaveProperty(key);
    });
  });
});

describe('PATCH /api/v1/kites/:id', () => {
  it('responds with a updated kite', async () => {
    const response = await request(app).patch(`/api/v1/kites/${id}`).set('Accept', 'application/json').send({
      imageUrl: 'images/valid/url.png',
    });

    expect(response.type).toBe('application/json');
    expect(response.status).toBe(200);
    Object.keys(kite).map(key => {
      expect(response.body).toHaveProperty(key);
    });
    expect(response.body).toHaveProperty('imageUrl', 'images/valid/url.png');
  });
});

describe('DELETE /api/vi/kites/:id', () => {
  it('responds with a deleted kite', async () => {
    const response = await request(app).delete(`/api/v1/kites/${id}`).set('Accept', 'application/json');

    expect(response.type).toBe('application/json');
    expect(response.status).toBe(200);
    Object.keys(kite).map(key => {
      expect(response.body).toHaveProperty(key);
    });
  });

  it('responds with a not found error', async () => {
    const response = await request(app).get(`/api/v1/kites/${id}`).set('Accept', 'application/json');

    expect(response.type).toBe('application/json');
    expect(response.status).toBe(404);
  });
});
