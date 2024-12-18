import { Truck } from 'domain/entities/trucks/Truck.ts';
import { IBaseRepository } from './BaseRepository.ts';

export interface ITruckRepository extends IBaseRepository<Truck> {
  findByPlate(plates: string): Promise<Truck | null>;
}
