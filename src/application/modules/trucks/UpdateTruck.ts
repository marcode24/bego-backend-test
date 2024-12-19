import { ITruckRepository } from 'domain/repositories/ITruckRepository.ts';
import { inject, injectable } from 'tsyringe';
import { UpdateTruckRequest } from './DTOs/Requests/UpdateTruckRequest.ts';
import { UpdateTruckResponse } from './DTOs/Responses/UpdateTruckResponse.ts';
import { TruckMessages } from './messages/TruckMessages.ts';
import { HttpStatus } from 'infrastructure/common/HttpStatus.ts';
import { IUserRepository } from 'domain/repositories/IUserRepository.ts';
import { UserMessages } from '../users/messages/UserMessages.ts';
import { Truck } from 'domain/entities/trucks/Truck.ts';

@injectable()
export default class UpdateTruck {
  constructor(
    @inject('ITruckRepository') private readonly truckRepository: ITruckRepository,
    @inject('IUserRepository') private readonly userRepository: IUserRepository
  ) {}

  public async execute(
    id: string,
    data: UpdateTruckRequest
  ): Promise<UpdateTruckResponse<Truck | string>> {
    const allowedFields = ['userId', 'year', 'color', 'plates'];

    const updateData = Object.keys(data)
      .filter((key) => allowedFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = data[key as keyof Truck];
        return obj;
      }, {} as Partial<Truck>);

    if (Object.keys(updateData).length === 0) {
      return UpdateTruckResponse.Failure(TruckMessages.NoFieldsToUpdate, HttpStatus.BAD_REQUEST);
    }

    const truckExists = await this.truckRepository.findById(id);
    if (!truckExists) {
      return UpdateTruckResponse.Failure(TruckMessages.TruckNotFound(id), HttpStatus.NOT_FOUND);
    }

    const { userId } = data;
    const userExists = await this.userRepository.findById(userId);

    if (!userExists) {
      return UpdateTruckResponse.Failure(UserMessages.UserNotFound(userId), HttpStatus.NOT_FOUND);
    }

    const truckWithSamePlates = await this.truckRepository.findByPlate(data.plates);
    if (truckWithSamePlates && truckWithSamePlates?.id !== id) {
      return UpdateTruckResponse.Failure(
        TruckMessages.TruckWithSamePlatesExists(data.plates),
        HttpStatus.BAD_REQUEST
      );
    }

    const updatedTruck = await this.truckRepository.update(id, updateData);
    return UpdateTruckResponse.Success(
      TruckMessages.UpdateTruckSuccess,
      HttpStatus.OK,
      updatedTruck
    );
  }
}
