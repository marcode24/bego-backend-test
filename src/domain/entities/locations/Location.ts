export class Location {
  id: string;
  placeId: string;
  address: string;
  latitude: number;
  longitude: number;
  createdAt: Date;
  updatedAt: Date;

  private constructor(
    placeId: string,
    address: string,
    latitude: number,
    longitude: number,
    createdAt: Date,
    updatedAt: Date,
    id?: string
  ) {
    this.placeId = placeId;
    this.address = address;
    this.latitude = latitude;
    this.longitude = longitude;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.id = id;
  }

  static create(placeId: string, address: string, latitude: number, longitude: number): Location {
    return new Location(placeId, address, latitude, longitude, new Date(), new Date());
  }

  static FromDocument(document): Location {
    return new Location(
      document.placeId,
      document.address,
      document.latitude,
      document.longitude,
      document.createdAt,
      document.updatedAt,
      document.id
    );
  }
}
