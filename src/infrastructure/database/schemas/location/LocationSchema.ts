import mongoose, { Schema } from 'mongoose';
import { ILocationDocument } from './ILocationDocument.ts';

const LocationSchema = new Schema<ILocationDocument>(
  {
    placeId: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const LocationModel = mongoose.model<ILocationDocument>('Location', LocationSchema);

export default LocationModel;
