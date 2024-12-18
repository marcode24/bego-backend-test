import { Router } from 'express';
import { container } from 'tsyringe';
import { validateRequest } from 'infrastructure/middlewares/validateRequest.ts';
import { CreateTruckValidator } from 'application/modules/trucks/validators/CreateTruckValidator.ts';
import { TruckController } from '../controllers/TruckController.ts';

export default (prefix: string, app: Router): void => {
  const truckController = container.resolve(TruckController);

  app.post(`${prefix}/trucks`, validateRequest(CreateTruckValidator), (req, res) =>
    truckController.create(req, res)
  );
};
