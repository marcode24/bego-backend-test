import CreateTruck from 'application/modules/trucks/CreateTruck.ts';
import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { CreateTruckRequest } from 'application/modules/trucks/DTOs/Requests/CreateTruckRequest.ts';
import DeleteTruck from 'application/modules/trucks/DeleteTruck.ts';
import GetTruck from 'application/modules/trucks/GetTruck.ts';
import GetTrucks from 'application/modules/trucks/GetTrucks.ts';
import UpdateTruck from 'application/modules/trucks/UpdateTruck.ts';

@injectable()
export class TruckController {
  constructor(
    @inject('CreateTruck') private readonly createTruck: CreateTruck,
    @inject('DeleteTruck') private readonly deleteTruck: DeleteTruck,
    @inject('GetTruck') private readonly getTruck: GetTruck,
    @inject('GetTrucks') private readonly getTrucks: GetTrucks,
    @inject('UpdateTruck') private readonly updateTruck: UpdateTruck
  ) {}

  async create(request: Request, response: Response): Promise<void> {
    const createTruckRequest: CreateTruckRequest = { ...request.body };
    const result = await this.createTruck.execute(createTruckRequest);
    response.status(result.statusCode).json(result);
  }

  async delete(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const result = await this.deleteTruck.execute(id);
    response.status(result.statusCode).json(result);
  }

  async findById(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const result = await this.getTruck.execute(id);
    response.status(result.statusCode).json(result);
  }

  async findAll(request: Request, response: Response): Promise<void> {
    const { all, page = 1, limit = 10 } = request.query;
    const result = await this.getTrucks.execute(all === 'true', +page, +limit);
    response.status(result.statusCode).json(result);
  }

  async update(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const createTruckRequest: CreateTruckRequest = { ...request.body };
    const result = await this.updateTruck.execute(id, createTruckRequest);
    response.status(result.statusCode).json(result);
  }
}
