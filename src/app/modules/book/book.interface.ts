export type IBookFilterRequest = {
  searchTerm?: string | undefined;
  categoryId?: string | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
};
