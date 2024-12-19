import { Router } from 'express';
import { container } from 'tsyringe';
import { validateRequest } from 'infrastructure/middlewares/validateRequest.ts';
import { CreateTruckValidator } from 'application/modules/trucks/validators/CreateTruckValidator.ts';
import { TruckController } from '../controllers/TruckController.ts';
import { validateParams } from 'infrastructure/middlewares/validateParams.ts';
import { truckIdValidator } from 'application/modules/trucks/validators/TruckIdValidator.ts';
import { UpdateTruckValidator } from 'application/modules/trucks/validators/UpdateTruckValidator.ts';
import { validateJwt } from 'infrastructure/middlewares/validateJwt.ts';

export default (prefix: string, app: Router): void => {
  const truckController = container.resolve(TruckController);

  app.get(`${prefix}/trucks`, validateJwt, (req, res) => truckController.findAll(req, res));

  app.get(`${prefix}/trucks/:id`, validateJwt, validateParams(truckIdValidator), (req, res) =>
    truckController.findById(req, res)
  );

  app.post(`${prefix}/trucks`, validateJwt, validateRequest(CreateTruckValidator), (req, res) =>
    truckController.create(req, res)
  );

  app.delete(`${prefix}/trucks/:id`, validateJwt, validateParams(truckIdValidator), (req, res) =>
    truckController.delete(req, res)
  );

  app.put(
    `${prefix}/trucks/:id`,
    validateJwt,
    validateParams(truckIdValidator),
    validateRequest(UpdateTruckValidator),
    (req, res) => truckController.update(req, res)
  );
};
