import { IOrderRepository } from 'domain/repositories/IOrderReposiory.ts';
import { inject, injectable } from 'tsyringe';
import { CreateOrderResponse } from './DTOs/Responses/CreateOrderResponse.ts';
import { Order } from 'domain/entities/orders/Order.ts';
import { CreateOrderRequest } from './DTOs/Requests/CreateOrderRequest.ts';
import { IUserRepository } from 'domain/repositories/IUserRepository.ts';
import { ITruckRepository } from 'domain/repositories/ITruckRepository.ts';
import { UserMessages } from '../users/messages/UserMessages.ts';
import { HttpStatus } from 'infrastructure/common/HttpStatus.ts';
import { TruckMessages } from '../trucks/messages/TruckMessages.ts';
import { ILocationRepository } from 'domain/repositories/ILocationRepository.ts';
import { OrderMessages } from './messages/OrderMessages.ts';

@injectable()
export default class CreateOrder {
  constructor(
    @inject('IOrderRepository') private readonly orderRepository: IOrderRepository,
    @inject('IUserRepository') private readonly userRepository: IUserRepository,
    @inject('ITruckRepository') private readonly truckRepository: ITruckRepository,
    @inject('ILocationRepository') private readonly locationRepository: ILocationRepository
  ) {}

  public async execute(data: CreateOrderRequest): Promise<CreateOrderResponse<Order | string>> {
    const userExists = await this.userRepository.findById(data.userId);
    if (!userExists) {
      return CreateOrderResponse.Failure(
        UserMessages.UserNotFound(data.userId),
        HttpStatus.NOT_FOUND
      );
    }

    const truckExists = await this.truckRepository.findById(data.truckId);
    if (!truckExists) {
      return CreateOrderResponse.Failure(
        TruckMessages.TruckNotFound(data.truckId),
        HttpStatus.NOT_FOUND
      );
    }

    const [pickupExists, dropoffExists] = await Promise.all([
      this.locationRepository.findById(data.pickup),
      this.locationRepository.findById(data.dropoff),
    ]);

    if (!pickupExists) {
      return CreateOrderResponse.Failure(
        OrderMessages.PickUpLocationNotFound,
        HttpStatus.NOT_FOUND
      );
    }

    if (!dropoffExists) {
      return CreateOrderResponse.Failure(
        OrderMessages.DropOffLocationNotFound,
        HttpStatus.NOT_FOUND
      );
    }

    const order = Order.create(data.userId, data.truckId, data.status, data.pickup, data.dropoff);
    const newOrder = await this.orderRepository.create(order);

    return CreateOrderResponse.Success(
      OrderMessages.CreateOrderSuccess,
      HttpStatus.CREATED,
      newOrder
    );
  }
}
