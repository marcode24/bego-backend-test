import { User } from 'domain/entities/users/User.ts';
import { IUserRepository } from 'domain/repositories/IUserRepository.ts';
import UserModel from 'infrastructure/database/schemas/User/UserSchema.ts';
import { injectable } from 'tsyringe';

@injectable()
export class UserRepository implements IUserRepository {
  async findById(id: string): Promise<User> {
    const userDocument = await UserModel.findById(id).exec();
    if (!userDocument) return null;

    return User.FromDocument(userDocument);
  }

  findByEmail(email: string): Promise<User | null> {
    return UserModel.findOne({ email }).exec();
  }

  create(data: User): Promise<User> {
    const userDoc = new UserModel(data);
    return userDoc.save();
  }
}
