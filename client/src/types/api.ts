export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  total?: number;
  page?: number;
  limit?: number;
  pageCount?: number;
  error?: string;
};
