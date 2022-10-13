import request from 'supertest';

import app from '../../app';

import { Kite } from './kite.model';

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

  it('responds with an error if the kite is invalid', async () => {
    const response = await request(app)
      .post('/api/v1/kites')
      .set('Accept', 'application/json')
      .send({ ...kite, name: '', price: -1 } as Kite);

    expect(response.type).toBe('application/json');
    expect(response.status).toBe(422);

    expect(response.body).toHaveProperty('message');
    console.log(response.body.message);
  });
});

describe('GET /api/v1/kites/:id', () => {
  it('responds with a single kite', async () => {
    const response = await request(app).get(`/api/v1/kites/${id}`).set('Accept', 'application/json');

    expect(response.type).toBe('application/json');
    expect(response.status).toBe(200);
    Object.keys(kite).map(key => {
      expect(response.body).toHaveProperty(key);
    });
    console.log(id);
  });

  it('responds with an invalid id zoderror', async () => {
    const response = await request(app).get(`/api/v1/kites/invalid-uuid`).set('Accept', 'application/json');
    expect(response.type).toBe('application/json');
    expect(response.status).toBe(422);

    expect(response.body).toHaveProperty('message');
    console.log(response.body.message);
  });

  it('responds with a not found error', async () => {
    const response = await request(app)
      .get(`/api/v1/kites/57d47adc-0512-488a-a568-9309b616ff51`)
      .set('Accept', 'application/json');

    expect(response.type).toBe('application/json');
    expect(response.status).toBe(404);
  });
});

describe('PUT /api/v1/kites/:id', () => {
  it('responds with a updated kite', async () => {
    const response = await request(app)
      .put(`/api/v1/kites/${id}`)
      .set('Accept', 'application/json')
      .send({
        ...kite,
        imageUrl: 'images/valid/url.png',
      });

    expect(response.type).toBe('application/json');
    expect(response.status).toBe(200);
    Object.keys(kite).map(key => {
      expect(response.body).toHaveProperty(key);
    });
    expect(response.body).toHaveProperty('imageUrl', 'images/valid/url.png');
  });

  it('responds with an invalid id zoderror', async () => {
    const response = await request(app).put(`/api/v1/kites/invalid-uuid`).set('Accept', 'application/json');
    expect(response.type).toBe('application/json');
    expect(response.status).toBe(422);

    expect(response.body).toHaveProperty('message');
    console.log(response.body.message);
  });

  it('responds with a not found error', async () => {
    const response = await request(app)
      .put(`/api/v1/kites/57d47adc-0512-488a-a568-9309b616ff51`)
      .send(kite)
      .set('Accept', 'application/json');

    expect(response.type).toBe('application/json');
    expect(response.status).toBe(404);
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

  it('responds with an invalid id zoderror', async () => {
    const response = await request(app).delete(`/api/v1/kites/invalid-uuid`).set('Accept', 'application/json');
    expect(response.type).toBe('application/json');
    expect(response.status).toBe(422);

    expect(response.body).toHaveProperty('message');
    console.log(response.body.message);
  });

  it('responds with a not found error', async () => {
    const response = await request(app).delete(`/api/v1/kites/${id}`).set('Accept', 'application/json');

    expect(response.type).toBe('application/json');
    expect(response.status).toBe(404);
  });
});
