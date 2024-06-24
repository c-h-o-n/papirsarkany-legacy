import console from 'console';
import { QueryConfig } from 'pg';
import { db } from '../../db';
import { insertQueryBuilder, updateQueryBuilder, upsertQueryBuilder } from '../../utilities/queryBuilders';
import { NewOrder, Order } from './order.model';

// SEND mail if order transaction is successfully committed
export async function createOrder(data: NewOrder): Promise<Order> {
  const { billing, shipping, contact, comment, paymentOption, shippingOption, products } = data;

  const customer = {
    email: contact.email,
    firstName: contact.firstName,
    lastName: contact.lastName,
    phone: contact.phone,

    shippingPostcode: shipping.postcode,
    shippingCity: shipping.city,
    shippingAddress: shipping.address,
    shippingSubaddress: shipping.subaddress,

    billingPostcode: billing.postcode,
    billingCity: billing.city,
    billingAddress: billing.address,
    billingSubaddress: billing.subaddress,
  };

  try {
    await db.query('BEGIN');

    const upsertCustomerQuery: QueryConfig = {
      text: upsertQueryBuilder('customers', customer, 'email'),
      values: Object.values(customer),
    };
    const { rows: cutomerRows } = await db.query(upsertCustomerQuery);

    const order = {
      customerId: cutomerRows[0].id,
      status: 'Pending',
      shippingOption,
      paymentOption,
      comment,
    };
    const insertOrderQuery: QueryConfig = {
      text: insertQueryBuilder('orders', order),
      values: Object.values(order),
    };

    const { rows: orderRows } = await db.query(insertOrderQuery);

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const orderItem = {
        orderId: orderRows[0].id,
        productId: product.id,
        quantity: product.quantity,
      };

      const insertOrderItemQuery: QueryConfig = {
        text: insertQueryBuilder('order_items', orderItem),
        values: Object.values(orderItem),
      };
      await db.query(insertOrderItemQuery);
    }

    console.log('commit');
    await db.query('COMMIT');

    return orderRows[0];
  } catch (error) {
    console.warn('rollback');
    await db.query('ROLLBACK');
    throw error;
  }
}

export async function getAllOrders(): Promise<Order[]> {
  const query: QueryConfig = {
    text: 'SELECT * from "orders"',
  };

  const { rows } = await db.query<Order>(query);
  return rows;
}

export async function getOrder(id: string): Promise<Order> {
  const query: QueryConfig = {
    text: 'SELECT * FROM "orders" WHERE id = $1',
    values: [id],
  };

  const { rows } = await db.query<Order>(query);
  return rows[0];
}

export async function updateOrder(id: string, data: Omit<Order, 'id'>): Promise<Order> {
  const query: QueryConfig = {
    text: updateQueryBuilder('orders', data),
    values: [...Object.values(data), id],
  };
  const { rows } = await db.query<Order>(query);
  return rows[0];
}

export async function deleteOrder(id: string): Promise<Order> {
  const query: QueryConfig = {
    text: 'DELETE from "orders" WHERE "id" = $1 RETURNING *',
    values: [id],
  };

  const { rows } = await db.query(query);

  return rows[0];
}
