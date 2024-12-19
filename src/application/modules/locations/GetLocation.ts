import { ILocationRepository } from 'domain/repositories/ILocationRepository.ts';
import { inject, injectable } from 'tsyringe';
import { GetLocationResponse } from './DTOs/Responses/GetLocationResponse.ts';
import { LocationMessages } from './messages/LocationMessages.ts';
import { HttpStatus } from 'infrastructure/common/HttpStatus.ts';
import { Location } from 'domain/entities/locations/Location.ts';

@injectable()
export default class GetLocation {
  constructor(
    @inject('ILocationRepository') private readonly locationRepository: ILocationRepository
  ) {}

  public async execute(id: string): Promise<GetLocationResponse<Location | string>> {
    const location = await this.locationRepository.findById(id);
    if (!location) {
      return GetLocationResponse.Failure(
        LocationMessages.LocationNotFoundWithId(id),
        HttpStatus.NOT_FOUND
      );
    }

    return GetLocationResponse.Success(LocationMessages.locationFound, HttpStatus.OK, location);
  }
}
