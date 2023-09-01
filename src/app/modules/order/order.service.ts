import { Order } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const insertIntoDB = async (payload: Order): Promise<Order> => {
  const result = await prisma.order.create({
    data: payload,
  });
  return result;
};

export const OrderService = { insertIntoDB };
