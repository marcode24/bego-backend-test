import { IOrderRepository } from 'domain/repositories/IOrderReposiory.ts';
import { inject, injectable } from 'tsyringe';
import { GetOrderResponse } from './DTOs/Responses/GetOrderResponse.ts';
import { Order } from 'domain/entities/orders/Order.ts';
import { OrderMessages } from './messages/OrderMessages.ts';
import { HttpStatus } from 'infrastructure/common/HttpStatus.ts';

@injectable()
export default class GetOrder {
  constructor(@inject('IOrderRepository') private readonly orderRepository: IOrderRepository) {}

  public async execute(id: string): Promise<GetOrderResponse<Order | string>> {
    const orderExists = await this.orderRepository.findById(id);
    if (!orderExists) {
      return GetOrderResponse.Failure(OrderMessages.OrderNotFound(id), HttpStatus.NOT_FOUND);
    }

    return GetOrderResponse.Success(OrderMessages.OrderFound, HttpStatus.OK, orderExists);
  }
}
