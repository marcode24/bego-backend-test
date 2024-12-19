import { IOrderRepository } from 'domain/repositories/IOrderReposiory.ts';
import { inject, injectable } from 'tsyringe';
import { ChangeStatusOrderResponse } from './DTOs/Responses/ChangeStatusOrderResponse.ts';
import { Order } from 'domain/entities/orders/Order.ts';
import { OrderMessages } from './messages/OrderMessages.ts';
import { HttpStatus } from 'infrastructure/common/HttpStatus.ts';
import { OrderStatus } from 'domain/entities/orders/Status.ts';
import { ChangeStatusOrderRequest } from './DTOs/Requests/ChangeStatusOrderRequest.ts';

@injectable()
export default class ChangeStatusOrder {
  constructor(@inject('IOrderRepository') private orderRepository: IOrderRepository) {}

  public async execute(
    id: string,
    request: ChangeStatusOrderRequest
  ): Promise<ChangeStatusOrderResponse<Order | string>> {
    const orderExists = await this.orderRepository.findById(id);
    if (!orderExists) {
      return ChangeStatusOrderResponse.Failure(
        OrderMessages.OrderNotFound(id),
        HttpStatus.NOT_FOUND
      );
    }

    const { status } = request;

    const combinations = [
      [OrderStatus.IN_TRANSIT, OrderStatus.COMPLETED],
      [OrderStatus.CREATED, OrderStatus.IN_TRANSIT],
    ];

    const isValidTransition = combinations.some(
      ([from, to]) => from === orderExists.status && to === status
    );

    if (!isValidTransition) {
      return ChangeStatusOrderResponse.Failure(
        OrderMessages.InvalidStatusTransition(orderExists.status, status),
        HttpStatus.BAD_REQUEST
      );
    }

    const updatedOrder = await this.orderRepository.changeStatus(id, status);
    return ChangeStatusOrderResponse.Success(
      OrderMessages.OrderChangeStatusSuccess(status),
      HttpStatus.OK,
      updatedOrder
    );
  }
}
