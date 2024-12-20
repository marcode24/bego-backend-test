import { AuthController } from 'api/modules/auth/controllers/AuthController.ts';
import { UserController } from 'api/modules/users/controllers/UserController.ts';
import LoginUser from 'application/modules/auth/LoginUser.ts';
import CreateUser from 'application/modules/users/CreateUser.ts';
import { IUserRepository } from 'domain/repositories/IUserRepository.ts';
import { IJwtService } from 'domain/services/IJwtService.ts';
import { UserRepository } from 'infrastructure/Repositories/UserRepository.ts';
import { JwtService } from 'infrastructure/services/JwtService.ts';
import { container } from 'tsyringe';

container.registerSingleton<IUserRepository>('IUserRepository', UserRepository);
container.registerSingleton<IJwtService>('IJwtService', JwtService);
container.registerSingleton('CreateUser', CreateUser);
container.registerSingleton('LoginUser', LoginUser);
container.registerSingleton('UserController', UserController);
container.registerSingleton('AuthController', AuthController);

export { container };
