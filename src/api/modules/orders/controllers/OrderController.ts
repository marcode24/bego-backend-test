import CreateOrder from 'application/modules/orders/CreateOrder.ts';
import { CreateOrderRequest } from 'application/modules/orders/DTOs/Requests/CreateOrderRequest.ts';
import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import ChangeStatusOrder from 'application/modules/orders/ChangeStatusOrder.ts';
import GetOrders from 'application/modules/orders/GetOrders.ts';

@injectable()
export class OrderController {
  constructor(
    @inject('CreateOrder') private createOrder: CreateOrder,
    @inject('ChangeStatusOrder') private changeStatusOrder: ChangeStatusOrder,
    @inject('GetOrders') private getOrders: GetOrders
  ) {}

  async create(request: Request, response: Response): Promise<void> {
    const createOrderRequest: CreateOrderRequest = { ...request.body };
    const result = await this.createOrder.execute(createOrderRequest);
    response.status(result.statusCode).json(result);
  }

  async changeStatus(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const { status } = request.body;
    const result = await this.changeStatusOrder.execute(id, { status });
    response.status(result.statusCode).json(result);
  }

  async getAll(request: Request, response: Response): Promise<void> {
    const { all, page = 1, limit = 10, status } = request.query;
    const result = await this.getOrders.execute({
      all: all === 'true',
      page: +page,
      limit: +limit,
      status: status as string,
    });
    response.status(result.statusCode).json(result);
  }
}
