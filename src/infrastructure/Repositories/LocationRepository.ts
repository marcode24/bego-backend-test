/* eslint-disable @typescript-eslint/no-unused-vars */
import { Location } from 'domain/entities/locations/Location.ts';
import { ILocationRepository } from 'domain/repositories/ILocationRepository.ts';
import LocationModel from 'infrastructure/database/schemas/location/LocationSchema.ts';
import { injectable } from 'tsyringe';

@injectable()
export class LocationRepository implements ILocationRepository {
  async findByPlaceId(placeId: string): Promise<Location | null> {
    const location = await LocationModel.findOne({ placeId }).exec();
    return location ? Location.FromDocument(location) : null;
  }

  async create(data: Location): Promise<Location> {
    const locationDoc = new LocationModel(data);
    const newLocation = await locationDoc.save();
    return Location.FromDocument(newLocation);
  }

  update(id: string, newData: Partial<Location>): Promise<Location> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<Location> {
    throw new Error('Method not implemented.');
  }
  find(
    all: boolean,
    page?: number,
    limit?: number
  ): Promise<{ items: Location[]; totalPages: number; totalItems: number }> {
    throw new Error('Method not implemented.');
  }
}
