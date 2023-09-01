export const BookSearchAbleFields = ['title', 'author', 'genre'];

export const BookFilterAbleFileds = [
  'searchTerm',
  'categoryId',
  'minPrice',
  'maxPrice',
];
export const BookRelationalFields: string[] = ['categoryId'];
export const BookRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: 'category',
};
