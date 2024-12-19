import { OrderStatus } from 'domain/entities/orders/Status.ts';

export interface ChangeStatusOrderRequest {
  status: OrderStatus;
}
