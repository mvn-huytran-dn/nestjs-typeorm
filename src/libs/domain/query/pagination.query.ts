import { FindManyOptions, FindOptionsWhere } from 'typeorm';
import { Pagination } from '../dtos/pagination.dto';

export function resolvedPaginationQuery<T>(
  options: FindManyOptions<T>,
  pagination: Pagination,
) {
  if (pagination) {
    options.take = pagination.pageSize;
    options.skip = pagination.pageSize * (pagination.page - 1);
  }
  return options;
}
