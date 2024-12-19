import { Router } from 'express';
import { container } from 'tsyringe';
import { validateRequest } from 'infrastructure/middlewares/validateRequest.ts';
import { CreateTruckValidator } from 'application/modules/trucks/validators/CreateTruckValidator.ts';
import { TruckController } from '../controllers/TruckController.ts';
import { validateParams } from 'infrastructure/middlewares/validateParams.ts';
import { truckIdValidator } from 'application/modules/trucks/validators/TruckIdValidator.ts';

export default (prefix: string, app: Router): void => {
  const truckController = container.resolve(TruckController);

  app.get(`${prefix}/trucks`, (req, res) => truckController.findAll(req, res));

  app.get(`${prefix}/trucks/:id`, validateParams(truckIdValidator), (req, res) =>
    truckController.findById(req, res)
  );

  app.post(`${prefix}/trucks`, validateRequest(CreateTruckValidator), (req, res) =>
    truckController.create(req, res)
  );

  app.delete(`${prefix}/trucks/:id`, validateParams(truckIdValidator), (req, res) =>
    truckController.delete(req, res)
  );
};
