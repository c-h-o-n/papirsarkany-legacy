// TODO test failing cases
import request from 'supertest';

import app from '../../app';
import { NewOrder, Order } from './order.model';

const testProduct = {
  id: '7e04520b-89a8-4556-8021-e8779437e451',
  name: 'kite created to test order',
  imageUrl: 'no/image',
  price: 13000,
  category: 'Egyzsinóros',
  description: 'lorem ipsum',
};

beforeAll(async () => {
  await request(app).post('/api/v1/kites').set('Accept', 'application/json').send(testProduct);
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

const newOrder: NewOrder = {
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
let order: Order;

describe('POST /api/v1/orders', () => {
  it('responds with an inserted order', async () => {
    const response = await request(app).post('/api/v1/orders').set('Accept', 'application/json').send(newOrder);

    expect(response.type).toBe('application/json');
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');

    id = response.body.id;
    order = response.body;
  });
});

describe('GET /api/v1/orders/:id', () => {
  it('responds with an order', async () => {
    const response = await request(app).get(`/api/v1/orders/${id}`).set('Accept', 'application/json');

    expect(response.type).toBe('application/json');
    expect(response.status).toBe(200);
  });
});

describe('PUT /api/v1/orders/:id', () => {
  it('responds with an updated order', async () => {
    const response = await request(app)
      .put(`/api/v1/orders/${id}`)
      .set('Accept', 'application.json')
      .send({
        ...order,
        status: 'Canceled',
      } as Order);

    expect(response.type).toBe('application/json');
    expect(response.status).toBe(200);
  });
});

describe('DELETE /api/v1/orders/:id', () => {
  it('responds with a deleted order', async () => {
    const response = await request(app).delete(`/api/v1/orders/${id}`).set('Accept', 'application/json');

    expect(response.type).toBe('application/json');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });
});

describe('cleanup', () => {
  it('repsonds with status 200', async () => {
    const productResponse = await request(app)
      .delete(`/api/v1/kites/${testProduct.id}`)
      .set('Accept', 'application/json');
    const customerResponse = await request(app)
      .delete(`/api/v1/customers/${newOrder.contact.email}`)
      .set('Accept', 'application/json');

    expect(productResponse.status).toBe(200);
    expect(customerResponse.status).toBe(200);
  });
});
