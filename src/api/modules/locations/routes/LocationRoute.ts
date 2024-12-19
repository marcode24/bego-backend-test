import { Router } from 'express';
import { LocationController } from '../controllers/LocationController.ts';
import { container } from 'tsyringe';
import { validateRequest } from 'infrastructure/middlewares/validateRequest.ts';
import { CreateLocationValidator } from 'application/modules/locations/validators/CreateLocationValidator.ts';
import { validateParams } from 'infrastructure/middlewares/validateParams.ts';
import { GetLocationValidator } from 'application/modules/locations/validators/GetLocationValidator.ts';
import { validateJwt } from 'infrastructure/middlewares/validateJwt.ts';

export default (prefix: string, app: Router): void => {
  const locationController = container.resolve(LocationController);

  app.get(
    `${prefix}/locations/:id`,
    validateJwt,
    validateParams(GetLocationValidator),
    (req, res) => locationController.get(req, res)
  );

  app.post(`${prefix}/locations`, validateRequest(CreateLocationValidator), (req, res) =>
    locationController.create(req, res)
  );

  app.delete(
    `${prefix}/locations/:id`,
    validateJwt,
    validateParams(GetLocationValidator),
    (req, res) => locationController.delete(req, res)
  );
};
