/* eslint-disable @typescript-eslint/no-explicit-any */
import { Book, Prisma } from '@prisma/client';
import { prisma } from '../../../shared/prisma';
import { IBookFilterRequest } from './book.interface';
import {
  IGenericResponse,
  IPaginationOptions,
} from '../../../interfaces/paginations';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import {
  BookRelationalFields,
  BookRelationalFieldsMapper,
  BookSearchAbleFields,
} from './book.constants';

const createBook = async (payload: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data: payload,
    include: {
      category: true,
    },
  });
  return result;
};

const getAllBook = async (
  filters: IBookFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<Book[]>> => {
  const { limit, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: BookSearchAbleFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map(key => {
        if (BookRelationalFields.includes(key)) {
          return {
            [BookRelationalFieldsMapper[key]]: {
              id: (filtersData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filtersData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    include: {
      category: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      paginationOptions.sortBy && paginationOptions.sortOrder
        ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
        : { createdAt: 'desc' },
  });
  const total = await prisma.book.count({
    where: whereConditions,
  });
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleBook = async (id: string) => {
  const Book = await prisma.book.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
  return Book;
};
const getBooksByCategoryId = async (id: string) => {
  const Book = await prisma.book.findMany({
    where: {
      categoryId: id,
    },
    include: {
      category: true,
    },
  });
  return Book;
};
const updateSingleBook = async (id: string, payload: Partial<Book>) => {
  const Book = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
    include: {
      category: true,
    },
  });
  return Book;
};
const deleteSingleBook = async (id: string) => {
  const Book = await prisma.book.delete({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
  return Book;
};

export const BookService = {
  createBook,
  getAllBook,
  getSingleBook,
  getBooksByCategoryId,
  updateSingleBook,
  deleteSingleBook,
};
