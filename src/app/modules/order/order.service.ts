/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '../../../shared/prisma';
import ApiError from '../../../errors/Apierror';
import httpStatus from 'http-status';

const insertIntoDB = async (user: any, payload: any) => {
  const { id, role } = user;

  const isExist = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (role !== 'customer') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Only customer can order');
  }
  const { orderedBooks } = payload;

  const result = await prisma.order.create({
    data: {
      userId: id,
      orderedBooks,
    },
  });
  return result;
};

const getAllOrder = async (user: any) => {
  const { role, id } = user;

  const isExist = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (role === 'admin') {
    const result = await prisma.order.findMany({
      include: {
        user: true,
      },
    });

    return result;
  }
  if (role === 'customer') {
    const result = await prisma.order.findMany({
      where: {
        userId: id,
      },
      include: {
        user: true,
      },
    });

    return result;
  }
};

const getOrderById = async (orderId: string, user: any) => {
  const { role, id } = user;

  const isExist = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (role === 'customer') {
    const result = await prisma.order.findUnique({
      where: {
        id: orderId,
        userId: id,
      },
      include: {
        user: true,
      },
    });
    return result;
  }
  if (role === 'admin') {
    const result = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        user: true,
      },
    });
    return result;
  }
};

export const OrderService = {
  insertIntoDB,
  getAllOrder,
  getOrderById,
};
