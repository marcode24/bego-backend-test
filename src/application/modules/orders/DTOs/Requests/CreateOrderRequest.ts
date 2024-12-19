import { OrderStatus } from 'domain/entities/orders/Status.ts';

export interface CreateOrderRequest {
  userId: string;
  truckId: string;
  status: OrderStatus;
  pickup: string;
  dropoff: string;
}
