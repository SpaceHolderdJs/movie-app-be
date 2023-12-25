export type PaginateQueryDto = {
  skip: number;
  limit: number;
};

export type PaginateResponseDto<T> = {
  data: T;
  page_total: number;
  current_page: number;
};
