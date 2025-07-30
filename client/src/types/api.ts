export type ApiResponse<T> = {
  data: T;
  total?: number;
  page?: number;
  limit?: number;
  pageCount?: number;
  error?: string;
};
