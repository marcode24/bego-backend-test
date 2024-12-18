import { inject, injectable } from 'tsyringe';
import { DeleteTruckResponse } from './DTOs/Responses/DeleteTruckResponse.ts';
import { TruckMessages } from './messages/TruckMessages.ts';
import { HttpStatus } from 'infrastructure/common/HttpStatus.ts';
import { ITruckRepository } from 'domain/repositories/ITruckRepository.ts';

@injectable()
export default class DeleteTruck {
  constructor(@inject('ITruckRepository') private readonly truckRepository: ITruckRepository) {}

  public async execute(id: string): Promise<DeleteTruckResponse<string>> {
    const truckExists = await this.truckRepository.findById(id);
    if (!truckExists) {
      return DeleteTruckResponse.Failure<string>(TruckMessages.TruckNotFound, HttpStatus.NOT_FOUND);
    }

    const deleted = await this.truckRepository.delete(id);
    if (!deleted) {
      return DeleteTruckResponse.Failure<string>(
        TruckMessages.TruckNotDeleted,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return DeleteTruckResponse.Success<string>(
      TruckMessages.DeleteTruckSuccess(truckExists.plates),
      HttpStatus.OK
    );
  }
}
