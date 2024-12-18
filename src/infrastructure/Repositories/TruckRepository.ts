import { Truck } from 'domain/entities/trucks/Truck.ts';
import { ITruckRepository } from 'domain/repositories/ITruckRepository.ts';
import { ITruckDocument } from 'infrastructure/database/schemas/truck/ITruckDocument.ts';
import TruckModel from 'infrastructure/database/schemas/truck/TruckSchema.ts';
import { injectable } from 'tsyringe';

@injectable()
export class TruckRepository implements ITruckRepository {
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
