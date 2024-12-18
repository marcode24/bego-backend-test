import { User } from 'domain/entities/users/User.ts';
import { IBaseRepository } from './BaseRepository.ts';

export interface IUserRepository extends IBaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
}
