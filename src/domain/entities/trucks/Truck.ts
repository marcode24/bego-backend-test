export class Truck {
  id: string;
  userId: string;
  year: string;
  color: string;
  plates: string;
  createdAt: Date;
  updatedAt: Date;

  private constructor(
    userId: string,
    year: string,
    color: string,
    plates: string,
    createdAt: Date,
    updatedAt: Date,
    id?: string
  ) {
    this.userId = userId;
    this.year = year;
    this.color = color;
    this.plates = plates;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.id = id;
  }

  static create(userId: string, year: string, color: string, plates: string): Truck {
    return new Truck(userId, year, color, plates, new Date(), new Date());
  }

  static FromDocument(document): Truck {
    return new Truck(
      document.userId,
      document.year,
      document.color,
      document.plates,
      document.createdAt,
      document.updatedAt,
      document.id
    );
  }
}
