export class LocationMessages {
  public static readonly locationDeleted = 'Location deleted';
  public static readonly locationUpdated = 'Location updated';
  public static readonly locationCreated = 'Location created';
  public static readonly locationFound = 'Location found';
  public static readonly LocationNotDeleted = 'Location not deleted';
  public static readonly locationsNotFound = 'Locations not found';
  public static readonly locationsFound = 'Locations found';
  public static readonly CreateLocationSuccess = 'Location created';
  public static readonly locationWithSamePlaceIdExists = (placeId: string): string =>
    `Location with placeId ${placeId} already exists`;

  public static readonly LocationNotFound = (placeId: string): string =>
    `Location with placeId ${placeId} not found`;

  public static readonly LocationNotDeletedPlaceId = (placeId: string): string =>
    `Location with placeId ${placeId} not deleted`;

  public static readonly LocationAlreadyExists = (placeId: string): string =>
    `Location with placeId ${placeId} already exists`;

  public static readonly LocationNotUpdated = (placeId: string): string =>
    `Location with placeId ${placeId} not updated`;

  public static readonly PlaceIdNotFound = (placeId: string): string =>
    `PlaceId ${placeId} not found`;

  public static readonly LocationNotFoundWithId = (id: string): string =>
    `Location with id ${id} not found`;

  public static readonly DeleteLocationSuccess = (id: string): string =>
    `Location with id ${id} deleted`;
}
