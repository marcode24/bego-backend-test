import { Location } from '../locations/Location.ts';
import { Truck } from '../trucks/Truck.ts';
import { User } from '../users/User.ts';
import { OrderStatus } from './Status.ts';

export class Order {
  id: string;
  user: User | string;
  truck: Truck | string;
  status: OrderStatus;
  pickup: Location | string;
  dropoff: Location | string;
  createdAt: Date;
  updatedAt: Date;

  private constructor(
    status: OrderStatus,
    pickup: Location | string,
    dropoff: Location | string,
    createdAt: Date,
    updatedAt: Date,
    user?: User | string,
    truck?: Truck | string,
    id?: string
  ) {
    this.status = status;
    this.pickup = pickup;
    this.dropoff = dropoff;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.id = id;
    this.user = user;
    this.truck = truck;
  }

  static create(
    user: User | string,
    truck: Truck | string,
    status: OrderStatus,
    pickup: Location | string,
    dropoff: Location | string
  ): Order {
    return new Order(status, pickup, dropoff, new Date(), new Date(), user, truck);
  }

  static FromDocument(document): Order {
    return new Order(
      document.status,
      document.pickup,
      document.dropoff,
      document.createdAt,
      document.updatedAt,
      document.user,
      document.truck,
      document.id
    );
  }
}
