/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const getAllUser = async () => {
  const users = await prisma.user.findMany();

  const usersWithoutPassword = users.map(user => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });

  return usersWithoutPassword;
};

const getSingleUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
  return user;
};
const updateSingleUser = async (id: string, payload: Partial<User>) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
  return user;
};
const deleteSingleUser = async (id: string) => {
  const user = await prisma.user.delete({
    where: {
      id,
    },

    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
  return user;
};

export const UserService = {
  getAllUser,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
