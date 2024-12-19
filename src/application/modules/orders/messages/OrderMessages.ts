export class OrderMessages {
  public static readonly CreateOrderSuccess: string = 'Order created';
  public static readonly UpdateOrderSuccess: string = 'Order updated';
  public static readonly OrderAlreadyExists: string = 'Order already exists';
  public static readonly OrderNotFound = (id: string): string => `Order with id ${id} not found`;
  public static readonly OrderSuccess = (plate: string): string =>
    `Order with plate ${plate} deleted`;
  public static readonly UserNotFound: string = 'User not found';
  public static readonly OrderNotDeleted: string = 'Order not deleted';
  public static readonly OrdersNotFound: string = 'Orders not found';
  public static readonly OrderFound: string = 'Order found';
  public static readonly OrdersFound: string = 'Orders found';
  public static readonly NoFieldsToUpdate: string = 'No fields to update';
  public static readonly OrderWithSamePlatesExists = (plates: string): string =>
    `Order with plates ${plates} already exists`;

  public static readonly PickUpLocationNotFound: string = 'Pickup location not found';
  public static readonly DropOffLocationNotFound: string = 'Dropoff location not found';

  public static readonly InvalidStatusTransition = (from: string, to: string): string =>
    `Invalid status transition from ${from} to ${to}`;

  public static readonly OrderChangeStatusSuccess = (status: string): string =>
    `Order status changed to ${status}`;
}
