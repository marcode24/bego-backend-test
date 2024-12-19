import { Order } from 'domain/entities/orders/Order.ts';
import { IBaseRepository } from './BaseRepository.ts';
import { OrderStatus } from 'domain/entities/orders/Status.ts';

export interface IOrderRepository extends IBaseRepository<Order> {
  changeStatus(id: string, status: OrderStatus): Promise<Order>;
}
