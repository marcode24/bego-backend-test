export class TruckMessages {
  public static readonly CreateTruckSuccess: string = 'Truck created';
  public static readonly TruckAlreadyExists: string = 'Truck already exists';
  public static readonly TruckNotFound: string = 'Truck not found';
  public static readonly DeleteTruckSuccess = (plate: string): string =>
    `Truck with plate ${plate} deleted`;
  public static readonly UserNotFound: string = 'User not found';
  public static readonly TruckNotDeleted: string = 'Truck not deleted';
}
