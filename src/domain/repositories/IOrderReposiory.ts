import { Order } from 'domain/entities/orders/Order.ts';
import { IBaseRepository } from './BaseRepository.ts';

export interface IOrderRepository extends IBaseRepository<Order> {
  findByStatus(status: string): Promise<Order[]>;
}
