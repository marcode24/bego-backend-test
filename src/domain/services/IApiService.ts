import { APIResponse } from 'domain/models/ApiResponse.ts';

export interface IApiService {
  getDataWithResilience(params: string, placeId: string): Promise<APIResponse>;
  init(params: string, placeId: string): void;
}
