export interface IBaseRepository<T> {
  create(data: T): Promise<T>;
  update(id: string, newData: Partial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
  findById(id: string): Promise<T>;
  find(
    all: boolean,
    page?: number,
    limit?: number
  ): Promise<{ items: T[]; totalPages: number; totalItems: number }>;
}
