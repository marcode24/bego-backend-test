import { ILocationRepository } from 'domain/repositories/ILocationRepository.ts';
import { inject, injectable } from 'tsyringe';
import { DeleteLocationResponse } from './DTOs/Responses/DeleteLocationResponse.ts';
import { LocationMessages } from './messages/LocationMessages.ts';
import { HttpStatus } from 'infrastructure/common/HttpStatus.ts';

@injectable()
export default class DeleteLocation {
  constructor(
    @inject('ILocationRepository') private readonly locationRepository: ILocationRepository
  ) {}

  public async execute(id: string): Promise<DeleteLocationResponse<string>> {
    const locationExists = await this.locationRepository.findById(id);
    if (!locationExists) {
      return DeleteLocationResponse.Failure<string>(
        LocationMessages.LocationNotFoundWithId(id),
        HttpStatus.NOT_FOUND
      );
    }

    const deleted = await this.locationRepository.delete(id);
    if (!deleted) {
      return DeleteLocationResponse.Failure<string>(
        LocationMessages.LocationNotDeleted,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return DeleteLocationResponse.Success<string>(
      LocationMessages.DeleteLocationSuccess(locationExists.id),
      HttpStatus.OK
    );
  }
}
