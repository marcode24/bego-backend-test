import { Router } from 'express';
import { UserController } from '../controllers/UserController.ts';
import { validateRequest } from 'infrastructure/middlewares/validateRequest.ts';
import { container } from 'tsyringe';
import { userValidationSchema } from 'application/validators/UserValidator.ts';

export default (prefix: string, app: Router): void => {
  const userController = container.resolve(UserController);

  app.post(`${prefix}/users`, validateRequest(userValidationSchema), (req, res) =>
    userController.create(req, res)
  );
};
