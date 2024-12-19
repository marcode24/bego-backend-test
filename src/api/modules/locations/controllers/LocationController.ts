import CreateLocation from 'application/modules/locations/CreateLocation.ts';
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

@injectable()
export class LocationController {
  constructor(@inject('CreateLocation') private createLocation: CreateLocation) {}

  async create(request: Request, response: Response): Promise<void> {
    const { placeId } = request.body;
    const result = await this.createLocation.execute({ placeId });
    response.status(result.statusCode).json(result);
  }
}
