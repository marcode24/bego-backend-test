import CreateLocation from 'application/modules/locations/CreateLocation.ts';
import DeleteLocation from 'application/modules/locations/DeleteLocation.ts';
import GetLocation from 'application/modules/locations/GetLocation.ts';
import UpdateLocation from 'application/modules/locations/UpdateLocation.ts';
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

@injectable()
export class LocationController {
  constructor(
    @inject('CreateLocation') private createLocation: CreateLocation,
    @inject('GetLocation') private getLocation: GetLocation,
    @inject('DeleteLocation') private deleteLocation: DeleteLocation,
    @inject('UpdateLocation') private updateLocation: UpdateLocation
  ) {}

  async create(request: Request, response: Response): Promise<void> {
    const { placeId } = request.body;
    const result = await this.createLocation.execute({ placeId });
    response.status(result.statusCode).json(result);
  }

  async get(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const result = await this.getLocation.execute(id);
    response.status(result.statusCode).json(result);
  }

  async delete(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const result = await this.deleteLocation.execute(id);
    response.status(result.statusCode).json(result);
  }

  async update(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const { placeId } = request.body;
    const result = await this.updateLocation.execute(id, { placeId });
    response.status(result.statusCode).json(result);
  }
}
