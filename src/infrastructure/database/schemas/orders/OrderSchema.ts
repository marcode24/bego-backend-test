import mongoose, { Schema } from 'mongoose';
import { IOrderDocument } from './IOrderDocument.ts';
import { OrderStatus } from 'domain/entities/orders/Status.ts';

const OrderSchema = new Schema<IOrderDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    truck: {
      type: Schema.Types.ObjectId,
      ref: 'Truck',
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.CREATED,
    },
    pickup: {
      type: Schema.Types.ObjectId,
      ref: 'Location',
      required: true,
    },
    dropoff: {
      type: Schema.Types.ObjectId,
      ref: 'Location',
      required: true,
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model<IOrderDocument>('Order', OrderSchema);

export default OrderModel;
