import CreateLocation from 'application/modules/locations/CreateLocation.ts';
import GetLocation from 'application/modules/locations/GetLocation.ts';
import { ILocationRepository } from 'domain/repositories/ILocationRepository.ts';
import { LocationRepository } from 'infrastructure/Repositories/LocationRepository.ts';
import { container } from 'tsyringe';

container.registerSingleton<ILocationRepository>('ILocationRepository', LocationRepository);
container.registerSingleton('CreateLocation', CreateLocation);
container.registerSingleton('GetLocation', GetLocation);

export { container };
