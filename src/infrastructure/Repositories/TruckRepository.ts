import { Truck } from 'domain/entities/trucks/Truck.ts';
import { ITruckRepository } from 'domain/repositories/ITruckRepository.ts';
import { ITruckDocument } from 'infrastructure/database/schemas/truck/ITruckDocument.ts';
import TruckModel from 'infrastructure/database/schemas/truck/TruckSchema.ts';
import { injectable } from 'tsyringe';

@injectable()
export class TruckRepository implements ITruckRepository {
  async find(
    all: boolean = false,
    page: number = 1,
    limit: number = 10
  ): Promise<{ items: Truck[]; totalPages: number; totalItems: number }> {
    if (all) {
      const trucks = await TruckModel.find({}).exec();
      return {
        items: trucks.map((truck) => Truck.FromDocument(truck)),
        totalPages: 1,
        totalItems: trucks.length,
      };
    }

    const [totalTrucks, trucks] = await Promise.all([
      TruckModel.countDocuments({}).exec(),
      TruckModel.find({})
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
    ]);

    const totalPages = Math.ceil(totalTrucks / limit);

    return {
      items: trucks.map((truck) => Truck.FromDocument(truck)),
      totalPages,
      totalItems: totalTrucks,
    };
  }

  async findById(id: string): Promise<Truck> {
    const truckDocument: ITruckDocument | null = await TruckModel.findById(id).exec();
    if (!truckDocument) return null;

    return Truck.FromDocument(truckDocument);
  }

  async findByPlate(plates: string): Promise<Truck | null> {
    const truckDocument: ITruckDocument | null = await TruckModel.findOne({ plates }).exec();
    if (!truckDocument) return null;

    return Truck.FromDocument(truckDocument);
  }

  async delete(id: string): Promise<boolean> {
    const truckDocument = await TruckModel.findByIdAndDelete(id).exec();
    return !!truckDocument;
  }

  async create(data: Truck): Promise<Truck> {
    const truckDoc = new TruckModel(data);
    const newTruck = await truckDoc.save();
    return Truck.FromDocument(newTruck);
  }
}
