import { Truck } from 'domain/entities/trucks/Truck.ts';
import { ITruckRepository } from 'domain/repositories/ITruckRepository.ts';
import { inject, injectable } from 'tsyringe';
import { GetTruckResponse } from './DTOs/Responses/GetTruckResponse.ts';
import { HttpStatus } from 'infrastructure/common/HttpStatus.ts';
import { TruckMessages } from './messages/TruckMessages.ts';

@injectable()
export default class GetTruck {
  constructor(@inject('ITruckRepository') private readonly truckRepository: ITruckRepository) {}

  public async execute(id: string): Promise<GetTruckResponse<Truck | string>> {
    const truck = await this.truckRepository.findById(id);
    if (!truck) {
      return GetTruckResponse.Failure(TruckMessages.TruckNotFound(id), HttpStatus.NOT_FOUND);
    }

    return GetTruckResponse.Success('Truck found', HttpStatus.OK, truck);
  }
}
