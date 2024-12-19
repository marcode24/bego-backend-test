import { Router } from 'express';
import { LocationController } from '../controllers/LocationController.ts';
import { container } from 'tsyringe';
import { validateRequest } from 'infrastructure/middlewares/validateRequest.ts';
import { CreateLocationValidator } from 'application/modules/locations/validators/CreateLocationValidator.ts';

export default (prefix: string, app: Router): void => {
  const locationController = container.resolve(LocationController);

  app.post(`${prefix}/locations`, validateRequest(CreateLocationValidator), (req, res) =>
    locationController.create(req, res)
  );
};
