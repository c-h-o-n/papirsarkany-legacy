import request from 'supertest';

import app from '../../app';
import { Material } from './material.model';

describe('GET /api/v1/materials', () => {
  it('responds with an array of materials', async () => {
    const response = await request(app).get('/api/v1/materials').set('Accept', 'application/json');

    expect(response.type).toBe('application/json');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('length');
  });
});

let id = '';

const material: Omit<Material, 'id'> = {
  name: 'inserted by test',
  price: 690,
  category: 'Anyag',
};

describe('POST /api/v1/materials', () => {
  it('responds with an insterted material', async () => {
    const response = await request(app).post('/api/v1/materials').set('Accept', 'application/json').send(material);

    expect(response.type).toBe('application/json');
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    Object.keys(material).map(key => {
      expect(response.body).toHaveProperty(key);
    });

    id = response.body.id;
  });

  it('responds with an error if the material is invalid', async () => {
    const response = await request(app)
      .post('/api/v1/materials')
      .set('Accept', 'application/json')
      .send({ ...material, name: '', price: -1 } as Material);

    expect(response.type).toBe('application/json');
    expect(response.status).toBe(422);

    expect(response.body).toHaveProperty('message');
    console.log(response.body.message);
  });

  it('responds with an error if the material category is invalid', async () => {
    const response = await request(app)
      .post('/api/v1/materials')
      .set('Accept', 'application/json')
      .send({ ...material, category: 'invalid-category' });

    expect(response.type).toBe('application/json');
    expect(response.status).toBe(422);

    expect(response.body).toHaveProperty('message');
    console.log(response.body.message);
  });
});

describe('GET /api/v1/materials/:id', () => {
  it('responds with a single material', async () => {
    const response = await request(app).get(`/api/v1/materials/${id}`).set('Accept', 'application/json');

    expect(response.type).toBe('application/json');
    expect(response.status).toBe(200);
    Object.keys(material).map(key => {
      expect(response.body).toHaveProperty(key);
    });
    console.log(id);
  });

  it('responds with an invalid id zoderror', async () => {
    const response = await request(app).get(`/api/v1/materials/invalid-uuid`).set('Accept', 'application/json');
    expect(response.type).toBe('application/json');
    expect(response.status).toBe(422);

    expect(response.body).toHaveProperty('message');
    console.log(response.body.message);
  });

  it('responds with a not found error', async () => {
    const response = await request(app)
      .get(`/api/v1/materials/57d47adc-0512-488a-a568-9309b616ff51`)
      .set('Accept', 'application/json');

    expect(response.type).toBe('application/json');
    expect(response.status).toBe(404);
  });
});

describe('PUT /api/v1/materials/:id', () => {
  it('responds with a updated material', async () => {
    const response = await request(app)
      .put(`/api/v1/materials/${id}`)
      .set('Accept', 'application/json')
      .send({
        ...material,
        imageUrl: 'images/valid/url.png',
      });

    expect(response.type).toBe('application/json');
    expect(response.status).toBe(200);
    Object.keys(material).map(key => {
      expect(response.body).toHaveProperty(key);
    });
    expect(response.body).toHaveProperty('imageUrl', 'images/valid/url.png');
  });

  it('responds with an invalid id zoderror', async () => {
    const response = await request(app).put(`/api/v1/materials/invalid-uuid`).set('Accept', 'application/json');
    expect(response.type).toBe('application/json');
    expect(response.status).toBe(422);

    expect(response.body).toHaveProperty('message');
    console.log(response.body.message);
  });

  it('responds with a not found error', async () => {
    const response = await request(app)
      .put(`/api/v1/materials/57d47adc-0512-488a-a568-9309b616ff51`)
      .send(material)
      .set('Accept', 'application/json');

    expect(response.type).toBe('application/json');
    expect(response.status).toBe(404);
  });
});

describe('DELETE /api/vi/materials/:id', () => {
  it('responds with a deleted material', async () => {
    const response = await request(app).delete(`/api/v1/materials/${id}`).set('Accept', 'application/json');

    expect(response.type).toBe('application/json');
    expect(response.status).toBe(200);
    Object.keys(material).map(key => {
      expect(response.body).toHaveProperty(key);
    });
  });

  it('responds with an invalid id zoderror', async () => {
    const response = await request(app).delete(`/api/v1/materials/invalid-uuid`).set('Accept', 'application/json');
    expect(response.type).toBe('application/json');
    expect(response.status).toBe(422);

    expect(response.body).toHaveProperty('message');
    console.log(response.body.message);
  });

  it('responds with a not found error', async () => {
    const response = await request(app).delete(`/api/v1/materials/${id}`).set('Accept', 'application/json');

    expect(response.type).toBe('application/json');
    expect(response.status).toBe(404);
  });
});
