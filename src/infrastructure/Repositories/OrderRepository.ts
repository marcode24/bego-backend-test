/* eslint-disable @typescript-eslint/no-unused-vars */
import { Order } from 'domain/entities/orders/Order.ts';
import { IOrderRepository } from 'domain/repositories/IOrderReposiory.ts';
import OrderModel from 'infrastructure/database/schemas/orders/OrderSchema.ts';
import { injectable } from 'tsyringe';

@injectable()
export class OrderRepository implements IOrderRepository {
  findByStatus(status: string): Promise<Order[]> {
    throw new Error('Method not implemented.');
  }

  async create(data: Order): Promise<Order> {
    const orderDocument = new OrderModel(data);
    const order = await orderDocument.save();
    const orderPopulated = await OrderModel.findById(order._id)
      .populate('truck', 'plates color year')
      .populate('user', 'name email')
      .populate('pickup', 'address latitude longitude')
      .populate('dropoff', 'address latitude longitude')
      .exec();
    return Order.FromDocument(orderPopulated);
  }

  update(id: string, newData: Partial<Order>): Promise<Order> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<Order> {
    throw new Error('Method not implemented.');
  }
  find(
    all: boolean,
    page?: number,
    limit?: number
  ): Promise<{ items: Order[]; totalPages: number; totalItems: number }> {
    throw new Error('Method not implemented.');
  }
}
