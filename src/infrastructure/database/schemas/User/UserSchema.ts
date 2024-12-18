import mongoose, { Schema } from 'mongoose';
import { User } from 'domain/entities/users/User.js';

const userSchema: Schema<User> = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;
