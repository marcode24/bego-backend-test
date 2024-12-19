import { IApiService } from 'domain/services/IApiService.ts';
import { ApiService } from 'infrastructure/services/ApiServices.ts';
import { container } from 'tsyringe';

container.registerSingleton<IApiService>('IApiService', ApiService);

export { container };
