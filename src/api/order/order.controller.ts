import { NextFunction, Request, Response, Router } from 'express';

import { validateRequest } from '../middlewares/validateRequest';
import { currencyFormatter } from '../../utilities/formatters';
import { NewOrder, Order } from './order.model';
import * as orderService from './order.service';
import * as kiteService from '../kite/kite.service';
import * as mailService from '../../mail/mail.service';
import { OrderMail } from '../../mail/mail.modal';

const { ORDER_MAIL } = process.env;

const router = Router();
// Create order
router.post(
  '/',
  validateRequest({ body: NewOrder }),
  async (req: Request<{}, NewOrder, Omit<NewOrder, 'id'>>, res: Response<Order>, next: NextFunction) => {
    try {
      const order = await orderService.createOrder(req.body);

      let totalPrice = 0;
      const kites: any[] = [];
      for (const product of req.body.products) {
        const kite = await kiteService.getKite(product.id);
        kites.push({ ...kite, quantity: product.quantity });
        totalPrice += kite.price * product.quantity;
      }

      const sendMe: OrderMail = {
        subject: `Rendelés #${order.id}`,
        ...req.body,
        products: [...kites],
        total: currencyFormatter(totalPrice),
      };
      try {
        mailService.sendMail(ORDER_MAIL!, sendMe);
      } catch (error) {
        console.log(error);
      }

      res.status(201);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

// Get all orders
router.get('/', async (req: Request, res: Response<Order[]>, next: NextFunction) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// Get order
router.get('/:id', async (req: Request<{ id: string }>, res: Response<Order>, next: NextFunction) => {
  try {
    const order = await orderService.getOrder(req.params.id);
    if (!order) {
      res.status(404);
      throw new Error(`Order with id ${req.params.id} not found!`);
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
});

// Update order
router.put(
  '/:id',
  validateRequest({ body: Order }),
  async (req: Request<{ id: string }, Order, Omit<Order, 'id'>>, res: Response<Order>, next: NextFunction) => {
    try {
      const order = await orderService.updateOrder(req.params.id, req.body);

      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

// Delete order
router.delete('/:id', async (req: Request<{ id: string }>, res: Response<Order>, next: NextFunction) => {
  try {
    const order = await orderService.deleteOrder(req.params.id);
    if (!order) {
      res.status(404);
      throw new Error(`Order with id ${req.params.id} not found!`);
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
});

export default router;
