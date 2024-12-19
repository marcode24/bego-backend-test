import { OrderController } from 'api/modules/orders/controllers/OrderController.ts';
import CreateOrder from 'application/modules/orders/CreateOrder.ts';
import { IOrderRepository } from 'domain/repositories/IOrderReposiory.ts';
import { OrderRepository } from 'infrastructure/Repositories/OrderRepository.ts';
import { container } from 'tsyringe';

container.registerSingleton<IOrderRepository>('IOrderRepository', OrderRepository);
container.registerSingleton('CreateOrder', CreateOrder);
container.registerSingleton('OrderController', OrderController);

export { container };
