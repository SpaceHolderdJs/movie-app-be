import { Injectable } from '@nestjs/common';
import { PaginateQueryDto, PaginateResponseDto } from './dto';
import { Model, QueryOptions } from 'mongoose';

@Injectable()
export class PaginateService {
  async paginatedResponse<T>(
    schema: Model<T>,
    paginationParams: PaginateQueryDto,
    findParams: Partial<T>,
    queryOptions?: QueryOptions<T>,
  ): Promise<PaginateResponseDto<T[]>> {
    const { limit, skip } = paginationParams;
    const count = await schema.countDocuments(findParams || {});

    const data = await schema
      .find(findParams || {}, {}, queryOptions || {})
      .limit(limit)
      .skip(skip);

    return { data, total: count };
  }
}
