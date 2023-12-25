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
    const count = await schema.countDocuments();
    const page_total = Math.floor((count - 1) / limit) + 1;
    const current_page = Math.floor(count - 1 / limit - skip);

    const data = await schema
      .find(findParams || {}, {}, queryOptions || {})
      .limit(limit)
      .skip(skip);

    return { page_total, data, current_page };
  }
}
