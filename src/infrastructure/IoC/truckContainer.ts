import { TruckController } from 'api/modules/trucks/controllers/TruckController.ts';
import CreateTruck from 'application/modules/trucks/CreateTruck.ts';
import DeleteTruck from 'application/modules/trucks/DeleteTruck.ts';
import GetTruck from 'application/modules/trucks/GetTruck.ts';
import GetTrucks from 'application/modules/trucks/GetTrucks.ts';
import UpdateTruck from 'application/modules/trucks/UpdateTruck.ts';
import { ITruckRepository } from 'domain/repositories/ITruckRepository.ts';
import { TruckRepository } from 'infrastructure/Repositories/TruckRepository.ts';
import { container } from 'tsyringe';

container.registerSingleton<ITruckRepository>('ITruckRepository', TruckRepository);
container.registerSingleton('CreateTruck', CreateTruck);
container.registerSingleton('GetTruck', GetTruck);
container.registerSingleton('GetTrucks', GetTrucks);
container.registerSingleton('DeleteTruck', DeleteTruck);
container.registerSingleton('UpdateTruck', UpdateTruck);
container.registerSingleton('TruckController', TruckController);

export { container };
