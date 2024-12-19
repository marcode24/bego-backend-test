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

  async find(
    all: boolean,
    page?: number,
    limit?: number
  ): Promise<{ items: Location[]; totalPages: number; totalItems: number }> {
    if (all) {
      const locations = await LocationModel.find({}).exec();
      return {
        items: locations.map((truck) => Location.FromDocument(truck)),
        totalPages: 1,
        totalItems: locations.length,
      };
    }

    const [totalLocations, locations] = await Promise.all([
      LocationModel.countDocuments({}).exec(),
      LocationModel.find({})
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
    ]);

    const totalPages = Math.ceil(totalLocations / limit);

    return {
      items: locations.map((truck) => Location.FromDocument(truck)),
      totalPages,
      totalItems: totalLocations,
    };
  }
}
