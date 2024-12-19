import { ITruckRepository } from 'domain/repositories/ITruckRepository.ts';
import { inject, injectable } from 'tsyringe';
import { CreateTruckRequest } from './DTOs/Requests/CreateTruckRequest.ts';
import { CreateTruckResponse } from './DTOs/Responses/CreateTruckResponse.ts';
import { Truck } from 'domain/entities/trucks/Truck.ts';
import { IUserRepository } from 'domain/repositories/IUserRepository.ts';
import { TruckMessages } from './messages/TruckMessages.ts';
import { UserMessages } from '../users/messages/UserMessages.ts';
import { HttpStatus } from 'infrastructure/common/HttpStatus.ts';

@injectable()
export default class CreateTruck {
  constructor(
    @inject('ITruckRepository') private readonly truckRepository: ITruckRepository,
    @inject('IUserRepository') private readonly userRepository: IUserRepository
  ) {}

  public async execute(data: CreateTruckRequest): Promise<CreateTruckResponse<Truck | string>> {
    const userExists = await this.userRepository.findById(data.userId);
    if (!userExists) {
      return CreateTruckResponse.Failure(
        UserMessages.UserNotFound(data.userId),
        HttpStatus.NOT_FOUND
      );
    }

    const truckExists = await this.truckRepository.findByPlate(data.plates);
    if (truckExists) {
      return CreateTruckResponse.Failure(
        TruckMessages.TruckWithSamePlatesExists(data.plates),
        HttpStatus.BAD_REQUEST
      );
    }

    const truck = Truck.create(data.userId, data.year, data.color, data.plates);
    const newTruck = await this.truckRepository.create(truck);
    return CreateTruckResponse.Success(
      TruckMessages.CreateTruckSuccess,
      HttpStatus.CREATED,
      newTruck
    );
  }
}
