import { AuthController } from 'api/modules/auth/controllers/AuthController.ts';
import { TruckController } from 'api/modules/trucks/controllers/TruckController.ts';
import { UserController } from 'api/modules/users/controllers/UserController.ts';
import LoginUser from 'application/modules/auth/LoginUser.ts';
import CreateTruck from 'application/modules/trucks/CreateTruck.ts';
import DeleteTruck from 'application/modules/trucks/DeleteTruck.ts';
import GetTruck from 'application/modules/trucks/GetTruck.ts';
import GetTrucks from 'application/modules/trucks/GetTrucks.ts';
import CreateUser from 'application/modules/users/CreateUser.ts';
import { ITruckRepository } from 'domain/repositories/ITruckRepository.ts';
import { IUserRepository } from 'domain/repositories/IUserRepository.ts';
import { IJwtService } from 'domain/services/IJwtService.ts';
import { TruckRepository } from 'infrastructure/Repositories/TruckRepository.ts';
import { UserRepository } from 'infrastructure/Repositories/UserRepository.ts';
import { JwtService } from 'infrastructure/services/JwtService.ts';
import { container } from 'tsyringe';

container.registerSingleton<IUserRepository>('IUserRepository', UserRepository);
container.registerSingleton<IJwtService>('IJwtService', JwtService);
container.registerSingleton('CreateUser', CreateUser);
container.registerSingleton('LoginUser', LoginUser);
container.registerSingleton('UserController', UserController);
container.registerSingleton('AuthController', AuthController);

container.registerSingleton<ITruckRepository>('ITruckRepository', TruckRepository);
container.registerSingleton('CreateTruck', CreateTruck);
container.registerSingleton('GetTruck', GetTruck);
container.registerSingleton('GetTrucks', GetTrucks);
container.registerSingleton('DeleteTruck', DeleteTruck);
container.registerSingleton('TruckController', TruckController);

export { container };
