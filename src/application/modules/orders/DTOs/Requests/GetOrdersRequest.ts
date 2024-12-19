export interface GetOrdersRequest {
  all: boolean;
  page?: number;
  limit?: number;
  status?: string;
}
