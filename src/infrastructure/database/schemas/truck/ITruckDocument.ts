import mongoose, { Document } from 'mongoose';

export interface ITruckDocument extends Document {
  userId: mongoose.Types.ObjectId;
  year: string;
  color: string;
  plates: string;
  createdAt: Date;
  updatedAt: Date;
}
