import { inject, injectable } from 'tsyringe';
import { TruckMessages } from './messages/TruckMessages.ts';
import { ITruckRepository } from 'domain/repositories/ITruckRepository.ts';
import { Truck } from 'domain/entities/trucks/Truck.ts';
import { GetTrucksResponse } from './DTOs/Responses/GetTrucksResponse.ts';
import { HttpStatus } from 'infrastructure/common/HttpStatus.ts';
import { Pagination } from 'application/DTOs/Pagination.ts';

@injectable()
export default class GetTrucks {
  constructor(@inject('ITruckRepository') private readonly truckRepository: ITruckRepository) {}

  public async execute(
    all: boolean = false,
    page: number = 1,
    limit: number = 10
  ): Promise<GetTrucksResponse<Truck[] | string>> {
    const pagination = new Pagination(page, limit);
    const { items, totalPages, totalItems } = await this.truckRepository.find(
      all,
      pagination.page,
      pagination.limit
    );

    return GetTrucksResponse.Success(
      TruckMessages.TrucksFound,
      HttpStatus.OK,
      items,
      totalItems,
      totalPages,
      pagination.limit,
      pagination.page
    );
  }
}
