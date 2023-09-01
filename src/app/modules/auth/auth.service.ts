/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '@prisma/client';
import { prisma } from '../../../shared/prisma';
import ApiError from '../../../errors/Apierror';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';

export const insertIntoDB = async (payload: User) => {
  const isExist = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });
  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Already exist this email');
  }
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const result = await prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
    },
  });
  if (!result) {
    throw new ApiError(404, 'Something Went wrong');
  }

  const { password, ...userWithoutPassword } = result;

  return userWithoutPassword;
};
export const AuthService = {
  insertIntoDB,
};
