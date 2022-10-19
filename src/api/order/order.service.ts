import console from 'console';
import { QueryConfig } from 'pg';
import { db } from '../../db';
import { insertQueryBuilder, updateQueryBuilder, upsertQueryBuilder } from '../../utilities/queryBuilders';
import { Order } from './order.model';

export async function createOrder(data: Omit<Order, 'id'>): Promise<Order> {
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
    console.log(cutomerRows[0]);

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
    console.log(orderRows[0]);
    const orderItems: any[] = [];
    products.forEach(product => {
      orderItems.push({
        orderId: orderRows[0].id,
        productId: product.id,
        quantity: product.quantity,
      });
    });

    orderItems.map(async orderItem => {
      try {
        const insertOrderItemQuery: QueryConfig = {
          text: insertQueryBuilder('order_items', orderItem),
          values: Object.values(orderItem),
        };

        const { rows } = await db.query(insertOrderItemQuery);
        console.log(rows);
      } catch (error) {
        console.log(error);
      }
    });

    await db.query('COMMIT');
    return { id: orderRows[0].id, ...data };
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
