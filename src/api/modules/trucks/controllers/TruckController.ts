import CreateTruck from 'application/modules/trucks/CreateTruck.ts';
import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { CreateTruckRequest } from 'application/modules/trucks/DTOs/Requests/CreateTruckRequest.ts';

@injectable()
export class TruckController {
  constructor(@inject('CreateTruck') private readonly createTruck: CreateTruck) {}

  async create(request: Request, response: Response): Promise<void> {
    const createTruckRequest: CreateTruckRequest = { ...request.body };
    const result = await this.createTruck.execute(createTruckRequest);
    response.status(result.statusCode).json(result);
  }
}
