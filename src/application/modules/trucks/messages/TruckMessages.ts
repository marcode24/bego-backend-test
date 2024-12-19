export class TruckMessages {
  public static readonly CreateTruckSuccess: string = 'Truck created';
  public static readonly TruckAlreadyExists: string = 'Truck already exists';
  public static readonly TruckNotFound = (id: string): string => `Truck with id ${id} not found`;
  public static readonly DeleteTruckSuccess = (plate: string): string =>
    `Truck with plate ${plate} deleted`;
  public static readonly UserNotFound: string = 'User not found';
  public static readonly TruckNotDeleted: string = 'Truck not deleted';
  public static readonly TrucksNotFound: string = 'Trucks not found';
  public static readonly TrucksFound: string = 'Trucks found';
}
