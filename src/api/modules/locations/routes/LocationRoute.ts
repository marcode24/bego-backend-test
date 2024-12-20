import { Router } from 'express';
import { LocationController } from '../controllers/LocationController.ts';
import { container } from 'tsyringe';
import { validateRequest } from 'infrastructure/middlewares/validateRequest.ts';
import { CreateLocationValidator } from 'application/modules/locations/validators/CreateLocationValidator.ts';
import { validateParams } from 'infrastructure/middlewares/validateParams.ts';
import { GetLocationValidator } from 'application/modules/locations/validators/GetLocationValidator.ts';
import { validateJwt } from 'infrastructure/middlewares/validateJwt.ts';
import { UpdateLocationValidator } from 'application/modules/locations/validators/UpdateLocationValidator.ts';
import { GeetLocationsValidator } from 'application/modules/locations/validators/GetLocationsValidator.ts';
import { validateQuery } from 'infrastructure/middlewares/validateQuery.ts';

export default (prefix: string, app: Router): void => {
  const locationController = container.resolve(LocationController);

  app.get(`${prefix}/locations`, validateJwt, validateQuery(GeetLocationsValidator), (req, res) =>
    locationController.getAll(req, res)
  );

  app.get(
    `${prefix}/locations/:id`,
    validateJwt,
    validateParams(GetLocationValidator),
    (req, res) => locationController.get(req, res)
  );

  app.post(
    `${prefix}/locations`,
    validateJwt,
    validateRequest(CreateLocationValidator),
    (req, res) => locationController.create(req, res)
  );

  app.delete(
    `${prefix}/locations/:id`,
    validateJwt,
    validateParams(GetLocationValidator),
    (req, res) => locationController.delete(req, res)
  );

  app.put(
    `${prefix}/locations/:id`,
    validateJwt,
    validateParams(GetLocationValidator),
    validateRequest(UpdateLocationValidator),
    (req, res) => locationController.update(req, res)
  );
};
