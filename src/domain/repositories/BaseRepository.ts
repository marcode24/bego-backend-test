export interface IBaseRepository<T> {
  create(data: T): Promise<T>;
  // update(data: T): Promise<T>;
  delete(id: string): Promise<boolean>;
  findById(id: string): Promise<T>;
  // findAll(): Promise<T[]>;
}
