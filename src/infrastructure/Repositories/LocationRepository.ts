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

  async update(id: string, newData: Partial<Location>): Promise<Location> {
    const updatedLocation = await LocationModel.findByIdAndUpdate(
      id,
      { $set: newData },
      { new: true }
    ).exec();

    return Location.FromDocument(updatedLocation);
  }
  async delete(id: string): Promise<boolean> {
    const locationDocument = await LocationModel.findByIdAndDelete(id).exec();
    return !!locationDocument;
  }

  async findById(id: string): Promise<Location> {
    const location = await LocationModel.findById(id).exec();
    return location ? Location.FromDocument(location) : null;
  }

  find(
    all: boolean,
    page?: number,
    limit?: number
  ): Promise<{ items: Location[]; totalPages: number; totalItems: number }> {
    throw new Error('Method not implemented.');
  }
}
