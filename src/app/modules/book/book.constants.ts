export const BookSearchAbleFields = ['title', 'author', 'genre'];

export const BookFilterAbleFileds = ['searchTerm', 'categoryId'];
export const BookRelationalFields: string[] = ['categoryId'];
export const BookRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: 'category',
};
