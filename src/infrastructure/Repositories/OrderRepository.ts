/* eslint-disable @typescript-eslint/no-unused-vars */
import { Order } from 'domain/entities/orders/Order.ts';
import { OrderStatus } from 'domain/entities/orders/Status.ts';
import { IOrderRepository } from 'domain/repositories/IOrderReposiory.ts';
import OrderModel from 'infrastructure/database/schemas/orders/OrderSchema.ts';
import { injectable } from 'tsyringe';

@injectable()
export class OrderRepository implements IOrderRepository {
  async changeStatus(id: string, status: OrderStatus): Promise<Order> {
    const order = await OrderModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
    return Order.FromDocument(order);
  }

  async create(data: Order): Promise<Order> {
    const orderDocument = new OrderModel(data);
    const order = await orderDocument.save();
    return await this.findById(order.id);
  }

  update(id: string, newData: Partial<Order>): Promise<Order> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async findById(id: string): Promise<Order> {
    const orderPopulated = await OrderModel.findById(id)
      .populate('truck', 'plates color year')
      .populate('user', 'name email')
      .populate('pickup', 'address latitude longitude')
      .populate('dropoff', 'address latitude longitude')
      .exec();
    return Order.FromDocument(orderPopulated);
  }

  find(
    all: boolean,
    page?: number,
    limit?: number,
    status?: string
  ): Promise<{ items: Order[]; totalPages: number; totalItems: number }> {
    const query = status ? { status } : {};

    if (all) {
      return OrderModel.find(query)
        .populate('truck', 'plates color year')
        .populate('user', 'name email')
        .populate('pickup', 'address latitude longitude')
        .populate('dropoff', 'address latitude longitude')
        .exec()
        .then((orders) => ({
          items: orders.map((order) => Order.FromDocument(order)),
          totalPages: 1,
          totalItems: orders.length,
        }));
    }

    return Promise.all([
      OrderModel.countDocuments(query).exec(),
      OrderModel.find(query)
        .populate('truck', 'plates color year')
        .populate('user', 'name email')
        .populate('pickup', 'address latitude longitude')
        .populate('dropoff', 'address latitude longitude')
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
    ]).then(([totalItems, orders]) => ({
      items: orders.map((order) => Order.FromDocument(order)),
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
    }));
  }
}
