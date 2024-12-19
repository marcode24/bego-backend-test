import CreateOrder from 'application/modules/orders/CreateOrder.ts';
import { CreateOrderRequest } from 'application/modules/orders/DTOs/Requests/CreateOrderRequest.ts';
import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';

@injectable()
export class OrderController {
  constructor(@inject('CreateOrder') private createOrder: CreateOrder) {}

  async create(request: Request, response: Response): Promise<void> {
    const createOrderRequest: CreateOrderRequest = { ...request.body };
    const result = await this.createOrder.execute(createOrderRequest);
    response.status(result.statusCode).json(result);
  }
}
