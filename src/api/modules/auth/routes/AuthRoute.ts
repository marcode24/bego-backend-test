import { loginValidationSchema } from 'application/modules/auth/validators/LoginValidator.ts';
import { Router } from 'express';
import { validateRequest } from 'infrastructure/middlewares/validateRequest.ts';
import { container } from 'tsyringe';
import { AuthController } from '../controllers/AuthController.ts';

export default (prefix: string, app: Router): void => {
  const authControlller = container.resolve(AuthController);

  app.post(`${prefix}/auth/login`, validateRequest(loginValidationSchema), (req, res) =>
    authControlller.login(req, res)
  );
};
