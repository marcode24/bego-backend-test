import { ILocationRepository } from 'domain/repositories/ILocationRepository.ts';
import { inject, injectable } from 'tsyringe';
import { UpdateLocationRequest } from './DTOs/Requests/UpdateLocationRequest.ts';
import { UpdateLocationResponse } from './DTOs/Responses/UpdateLocationResponse.ts';
import { Location } from 'domain/entities/locations/Location.ts';
import { LocationMessages } from './messages/LocationMessages.ts';
import { HttpStatus } from 'infrastructure/common/HttpStatus.ts';
import { IApiService } from 'domain/services/IApiService.ts';

@injectable()
export default class UpdateLocation {
  constructor(
    @inject('ILocationRepository') private readonly locationRepository: ILocationRepository,
    @inject('IApiService') private readonly apiService: IApiService
  ) {}

  public async execute(
    id: string,
    data: UpdateLocationRequest
  ): Promise<UpdateLocationResponse<Location | string>> {
    const allowedFields = ['placeId'];
    const updateData = Object.keys(data)
      .filter((key) => allowedFields.includes(key) && data[key]?.length > 0)
      .reduce((obj, key) => {
        obj[key] = data[key as keyof Location];
        return obj;
      }, {} as Partial<Location>);

    if (Object.keys(updateData).length === 0) {
      return UpdateLocationResponse.Failure(
        LocationMessages.NoFieldsToUpdate,
        HttpStatus.BAD_REQUEST
      );
    }

    const locationExists = await this.locationRepository.findById(id);
    if (!locationExists) {
      return UpdateLocationResponse.Failure(
        LocationMessages.LocationNotFoundWithId(id),
        HttpStatus.NOT_FOUND
      );
    }

    const placeIdExists = await this.locationRepository.findByPlaceId(data.placeId);

    if (placeIdExists && placeIdExists.id !== id) {
      return UpdateLocationResponse.Failure(
        LocationMessages.LocationWithSamePlaceIdExists(data.placeId),
        HttpStatus.BAD_REQUEST
      );
    }

    const responseMaps = await this.apiService.getDataWithResilience(
      `geometry,formatted_address`,
      data.placeId
    );

    if (!responseMaps || responseMaps.error_message?.length > 0) {
      return UpdateLocationResponse.Failure(
        LocationMessages.PlaceIdNotFoundApi(data.placeId),
        HttpStatus.NOT_FOUND
      );
    }

    const { formatted_address, geometry } = responseMaps.result;
    const { lat, lng } = geometry.location;
    const location = Location.create(data.placeId, formatted_address, lat, lng);
    const updatedLocation = await this.locationRepository.update(id, location);

    return UpdateLocationResponse.Success(
      LocationMessages.locationUpdated,
      HttpStatus.OK,
      updatedLocation
    );
  }
}
