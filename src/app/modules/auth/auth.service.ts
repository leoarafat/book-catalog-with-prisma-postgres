import { User } from '@prisma/client';
import { prisma } from '../../../shared/prisma';
import ApiError from '../../../errors/Apierror';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

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
  const { email, role } = payload;
  const accessToken = jwtHelpers.createToken(
    { email, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );
  //Create refresh token
  const refreshToken = jwtHelpers.createToken(
    { email, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );
  return {
    accessToken,
    refreshToken,
    result,
  };
};
export const AuthService = {
  insertIntoDB,
};
