import { Document } from 'mongoose';

export interface ILocationDocument extends Document {
  placeId: string;
  address: string;
  latitude: number;
  longitude: number;
  createdAt: Date;
  updatedAt: Date;
}
