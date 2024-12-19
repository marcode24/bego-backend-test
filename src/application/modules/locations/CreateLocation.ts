import { ILocationRepository } from 'domain/repositories/ILocationRepository.ts';
import { inject, injectable } from 'tsyringe';
import { CreateLocationRequest } from './DTOs/Requests/CreateLocationRequest.ts';
import { CreateLocationResponse } from './DTOs/Responses/CreateLocationResponse.ts';
import { HttpStatus } from 'infrastructure/common/HttpStatus.ts';
import { LocationMessages } from './messages/LocationMessages.ts';
import { IApiService } from 'domain/services/IApiService.ts';
import { Location } from 'domain/entities/locations/Location.ts';

@injectable()
export default class CreateLocation {
  constructor(
    @inject('ILocationRepository') private readonly locationRepository: ILocationRepository,
    @inject('IApiService') private readonly apiService: IApiService
  ) {}

  public async execute(
    data: CreateLocationRequest
  ): Promise<CreateLocationResponse<Location | string>> {
    const PLACE_ID = data.placeId;
    const responseMaps = await this.apiService.getDataWithResilience(
      `geometry,formatted_address`,
      PLACE_ID
    );

    if (!responseMaps || responseMaps.error_message?.length > 0) {
      // escribir en logs posibles errores
      return CreateLocationResponse.Failure(
        LocationMessages.PlaceIdNotFound(PLACE_ID),
        HttpStatus.NOT_FOUND
      );
    }

    const locationExists = await this.locationRepository.findByPlaceId(PLACE_ID);

    if (locationExists) {
      return CreateLocationResponse.Failure(
        LocationMessages.LocationAlreadyExists(PLACE_ID),
        HttpStatus.BAD_REQUEST
      );
    }

    const { formatted_address, geometry } = responseMaps.result;
    const { lat, lng } = geometry.location;
    const location = Location.create(PLACE_ID, formatted_address, lat, lng);
    const newLocation = await this.locationRepository.create(location);

    return CreateLocationResponse.Success(
      LocationMessages.CreateLocationSuccess,
      HttpStatus.CREATED,
      newLocation
    );
  }
}
