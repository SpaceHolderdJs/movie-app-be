export type PaginateQueryDto = {
  skip: number;
  limit: number;
};

export type PaginateResponseDto<T> = {
  data: T;
  total: number;
};
