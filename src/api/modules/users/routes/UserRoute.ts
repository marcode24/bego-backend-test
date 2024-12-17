import { Router } from 'express';
import { UserController } from '../controllers/UserController.ts';
import { validateRequest } from 'infrastructure/middlewares/validateRequest.ts';
import { container } from 'tsyringe';

export default (prefix: string, app: Router): void => {
  const userController = container.resolve(UserController);

  app.post(`${prefix}/users`, validateRequest, (req, res) => userController.create(req, res));
};
