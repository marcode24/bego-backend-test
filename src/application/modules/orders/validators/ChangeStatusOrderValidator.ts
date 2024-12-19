import Joi from 'joi';
import { ChangeStatusOrderRequest } from '../DTOs/Requests/ChangeStatusOrderRequest.ts';
import { OrderStatus } from 'domain/entities/orders/Status.ts';

export const ChangeStatusOrderValidator = Joi.object<ChangeStatusOrderRequest>({
  status: Joi.string().required().valid(OrderStatus.IN_TRANSIT, OrderStatus.COMPLETED).messages({
    'string.base': 'Status must be a string',
    'string.empty': 'Status is required',
    'any.only': 'Status must be one of {#valids}',
  }),
});
