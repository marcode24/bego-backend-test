import { OrderController } from 'api/modules/orders/controllers/OrderController.ts';
import ChangeStatusOrder from 'application/modules/orders/ChangeStatusOrder.ts';
import CreateOrder from 'application/modules/orders/CreateOrder.ts';
import GetOrders from 'application/modules/orders/GetOrders.ts';
import { IOrderRepository } from 'domain/repositories/IOrderReposiory.ts';
import { OrderRepository } from 'infrastructure/Repositories/OrderRepository.ts';
import { container } from 'tsyringe';

container.registerSingleton<IOrderRepository>('IOrderRepository', OrderRepository);
container.registerSingleton('CreateOrder', CreateOrder);
container.registerSingleton('ChangeStatusOrder', ChangeStatusOrder);
container.registerSingleton('GetOrders', GetOrders);
container.registerSingleton('OrderController', OrderController);

export { container };
