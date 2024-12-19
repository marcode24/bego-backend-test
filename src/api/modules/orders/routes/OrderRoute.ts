import { Router } from 'express';
import { OrderController } from '../controllers/OrderController.ts';
import { container } from 'tsyringe';
import { validateJwt } from 'infrastructure/middlewares/validateJwt.ts';
import { validateRequest } from 'infrastructure/middlewares/validateRequest.ts';
import { CreateOrderValidator } from 'application/modules/orders/validators/CreateOrderValidator.ts';
import { ChangeStatusOrderValidator } from 'application/modules/orders/validators/ChangeStatusOrderValidator.ts';
import { validateParams } from 'infrastructure/middlewares/validateParams.ts';
import { OrderIdValidator } from 'application/modules/orders/validators/OrderIdValidator.ts';
import { validateQuery } from 'infrastructure/middlewares/validateQuery.ts';
import { GeetOrderValidator } from 'application/modules/orders/validators/GetOrdersValidator.ts';

export default (prefix: string, app: Router): void => {
  const orderController = container.resolve(OrderController);

  app.get(`${prefix}/orders`, validateJwt, validateQuery(GeetOrderValidator), (req, res) =>
    orderController.getAll(req, res)
  );

  app.get(`${prefix}/orders/:id`, validateJwt, validateParams(OrderIdValidator), (req, res) =>
    orderController.get(req, res)
  );

  app.post(`${prefix}/orders`, validateJwt, validateRequest(CreateOrderValidator), (req, res) =>
    orderController.create(req, res)
  );

  app.patch(
    `${prefix}/orders/:id`,
    validateJwt,
    validateParams(OrderIdValidator),
    validateRequest(ChangeStatusOrderValidator),
    (req, res) => orderController.changeStatus(req, res)
  );
};
