import { OrderStatus } from 'domain/entities/orders/Status.ts';
import mongoose, { Document } from 'mongoose';

export interface IOrderDocument extends Document {
  user: mongoose.Types.ObjectId;
  truck: mongoose.Types.ObjectId;
  status: OrderStatus;
  pickup: mongoose.Types.ObjectId;
  dropoff: mongoose.Types.ObjectId;
}
