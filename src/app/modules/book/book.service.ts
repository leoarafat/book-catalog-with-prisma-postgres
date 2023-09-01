import { Book } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const createBook = async (payload: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data: payload,
    include: {
      category: true,
    },
  });
  return result;
};

const getAllBook = async (): Promise<Book[]> => {
  const result = await prisma.book.findMany({
    include: {
      category: true,
    },
  });
  return result;
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
