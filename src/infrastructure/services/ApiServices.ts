import EnvConfig from 'application/config/EnvConfig.ts';
import axios, { AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';
import { APIResponse } from 'domain/models/ApiResponse.ts';
import { IApiService } from 'domain/services/IApiService.ts';
import CircuitBreaker from 'opossum';

export class ApiService implements IApiService {
  private axiosInstance: AxiosInstance;
  private circuitBreaker: CircuitBreaker;
  private apiKey: string;

  constructor() {}

  init(params: string, placeId: string): void {
    const envConfig = new EnvConfig();
    const { API_BASE_URL, API_KEY } = envConfig.env;
    this.apiKey = API_KEY;
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 5000,
      params: {
        fields: params,
        place_id: placeId,
        key: this.apiKey,
      },
    });

    axiosRetry(this.axiosInstance, {
      retries: 3,
      retryDelay: (retryCount) => retryCount * 1000,
      retryCondition: (error) => {
        return error.code === 'ERR_BAD_REQUEST' || error.code === 'ERR_CONNECTION_TIMED_OUT';
      },
    });

    this.circuitBreaker = new CircuitBreaker(this.fetchData.bind(this), {
      timeout: 15000,
      errorThresholdPercentage: 50,
      resetTimeout: 30000,
    });
  }

  async fetchData(): Promise<APIResponse> {
    try {
      const response = await this.axiosInstance.get('');
      return response.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to fetch the data. Error:', error.message);
      return null;
    }
  }

  async getDataWithResilience(params: string, placeId: string): Promise<APIResponse> {
    this.init(params, placeId);
    return this.circuitBreaker.fire('') as Promise<APIResponse>;
  }
}
