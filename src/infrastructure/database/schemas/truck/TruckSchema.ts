import mongoose, { Schema } from 'mongoose';
import { ITruckDocument } from './ITruckDocument.ts';

const TruckSchema = new Schema<ITruckDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    plates: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TruckModel = mongoose.model<ITruckDocument>('Truck', TruckSchema);

export default TruckModel;
