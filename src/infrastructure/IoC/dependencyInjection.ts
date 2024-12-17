import { UserController } from 'api/modules/users/controllers/UserController.ts';
import CreateUser from 'application/modules/users/CreateUser.ts';
import { IUserRepository } from 'domain/repositories/IUserRepository.ts';
import { UserRepository } from 'infrastructure/Repositories/UserRepository.ts';
import { container } from 'tsyringe';

container.registerSingleton<IUserRepository>('IUserRepository', UserRepository);
container.registerSingleton('CreateUser', CreateUser);
container.registerSingleton('UserController', UserController);

export { container };
