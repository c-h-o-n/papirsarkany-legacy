import request from 'supertest';

import app from '../../app';
import { Order } from './order.model';

beforeAll(async () => {
  await request(app).post('/api/v1/kites').set('Accept', 'application/json').send({
    id: '7e04520b-89a8-4556-8021-e8779437e451',
    name: 'kite created to test order',
    imageUrl: 'no/image',
    price: 13000,
    category: 'Egyzsinóros',
    description: 'lorem ipsum',
  });
});

describe('GET /api/v1/orders', () => {
  it('responds with an array of orders', async () => {
    const response = await request(app).get('/api/v1/orders').set('Accept', 'application/json');

    console.log(response.body);
    expect(response.type).toBe('application/json');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('length');
  });
});

const order: Omit<Order, 'id'> = {
  contact: {
    email: 'ducsai46982@gmail.com',
    lastName: 'Ducsai',
    firstName: 'Bálint',
    phone: '+36202422988',
  },
  paymentOption: 'Átvételkor készpénzel',
  shippingOption: 'Postai szállítás',
  shipping: {
    postcode: '2094',
    city: 'Budapest',
    address: 'Kazal utca 6.',
    subaddress: '',
  },
  billing: {
    address: 'Kazal utca 6.',
    city: 'Nagykovácsi',
    postcode: '2094',
    subaddress: '',
  },
  comment: '',
  products: [
    {
      id: '7e04520b-89a8-4556-8021-e8779437e451',
      quantity: 1,
    },
  ],
};

let id = -1;

describe('POST /api/v1/orders', () => {
  it('responds with an inserted order', async () => {
    const response = await request(app).post('/api/v1/orders').set('Accept', 'application/json').send(order);

    expect(response.type).toBe('application/json');
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    Object.keys(order).map(key => {
      expect(response.body).toHaveProperty(key);
    });

    id = response.body.id;
  });
});

describe('DELETE /api/v1/orders:id', () => {
  it('responds with a delete order', async () => {
    await request(app).delete('/api/v1/kites/7e04520b-89a8-4556-8021-e8779437e451').set('Accept', 'application/json');

    const response = await request(app).delete(`/api/v1/orders/${id}`).set('Accept', 'application/json');
  });
});
