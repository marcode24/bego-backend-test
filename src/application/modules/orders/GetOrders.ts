import { inject, injectable } from 'tsyringe';
import { GetOrdersResponse } from './DTOs/Responses/GetOrdersResponse.ts';
import { GetOrdersRequest } from './DTOs/Requests/GetOrdersRequest.ts';
import { Order } from 'domain/entities/orders/Order.ts';
import { Pagination } from 'application/DTOs/Pagination.ts';
import { IOrderRepository } from 'domain/repositories/IOrderReposiory.ts';
import { OrderMessages } from './messages/OrderMessages.ts';
import { HttpStatus } from 'infrastructure/common/HttpStatus.ts';

@injectable()
export default class GetOrders {
  constructor(@inject('IOrderRepository') private readonly orderRepository: IOrderRepository) {}

  public async execute(request: GetOrdersRequest): Promise<GetOrdersResponse<Order[] | string>> {
    const { page = 1, limit = 10 } = request;
    const pagination = new Pagination(page, limit);
    const { items, totalPages, totalItems } = await this.orderRepository.find(
      request.all,
      pagination.page,
      pagination.limit,
      request.status
    );

    return GetOrdersResponse.Success(
      OrderMessages.OrdersFound,
      HttpStatus.OK,
      items,
      totalItems,
      totalPages,
      pagination.limit,
      pagination.page
    );
  }
}
