import { ILocationRepository } from 'domain/repositories/ILocationRepository.ts';
import { inject, injectable } from 'tsyringe';
import { GetLocationResponse } from './DTOs/Responses/GetLocationResponse.ts';
import { Location } from 'domain/entities/locations/Location.ts';
import { Pagination } from 'application/DTOs/Pagination.ts';
import { LocationMessages } from './messages/LocationMessages.ts';
import { HttpStatus } from 'infrastructure/common/HttpStatus.ts';

@injectable()
export default class GetLocations {
  constructor(
    @inject('ILocationRepository') private readonly locationRepository: ILocationRepository
  ) {}

  public async execute(
    all: boolean = false,
    page: number = 1,
    limit: number = 10
  ): Promise<GetLocationResponse<Location[] | string>> {
    const pagination = new Pagination(page, limit);
    const { items, totalPages, totalItems } = await this.locationRepository.find(
      all,
      pagination.page,
      pagination.limit
    );

    return GetLocationResponse.Success(
      LocationMessages.locationsFound,
      HttpStatus.OK,
      items,
      totalItems,
      totalPages,
      pagination.limit,
      pagination.page
    );
  }
}
