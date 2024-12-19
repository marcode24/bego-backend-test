export class TruckMessages {
  public static readonly CreateTruckSuccess: string = 'Truck created';
  public static readonly UpdateTruckSuccess: string = 'Truck updated';
  public static readonly TruckAlreadyExists: string = 'Truck already exists';
  public static readonly TruckNotFound = (id: string): string => `Truck with id ${id} not found`;
  public static readonly DeleteTruckSuccess = (plate: string): string =>
    `Truck with plate ${plate} deleted`;
  public static readonly UserNotFound: string = 'User not found';
  public static readonly TruckNotDeleted: string = 'Truck not deleted';
  public static readonly TrucksNotFound: string = 'Trucks not found';
  public static readonly TrucksFound: string = 'Trucks found';
  public static readonly NoFieldsToUpdate: string = 'No fields to update';
  public static readonly TruckWithSamePlatesExists = (plates: string): string =>
    `Truck with plates ${plates} already exists`;
}
