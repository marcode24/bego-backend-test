import { Location } from 'domain/entities/locations/Location.ts';
import { IBaseRepository } from './BaseRepository.ts';

export interface ILocationRepository extends IBaseRepository<Location> {
  findByPlaceId(placeId: string): Promise<Location | null>;
}
