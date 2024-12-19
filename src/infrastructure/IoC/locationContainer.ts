import CreateLocation from 'application/modules/locations/CreateLocation.ts';
import DeleteLocation from 'application/modules/locations/DeleteLocation.ts';
import GetLocation from 'application/modules/locations/GetLocation.ts';
import UpdateLocation from 'application/modules/locations/UpdateLocation.ts';
import { ILocationRepository } from 'domain/repositories/ILocationRepository.ts';
import { LocationRepository } from 'infrastructure/Repositories/LocationRepository.ts';
import { container } from 'tsyringe';

container.registerSingleton<ILocationRepository>('ILocationRepository', LocationRepository);
container.registerSingleton('CreateLocation', CreateLocation);
container.registerSingleton('GetLocation', GetLocation);
container.registerSingleton('DeleteLocation', DeleteLocation);
container.registerSingleton('UpdateLocation', UpdateLocation);

export { container };
