import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './movie.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MovieDto } from './dto';
import { UserService } from 'src/user/user.service';
import { PaginateService } from 'src/paginate/paginate.service';
import { PaginateQueryDto } from 'src/paginate/dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<Movie>,
    private userService: UserService,
    private paginateService: PaginateService,
  ) {}

  async create(dto: MovieDto) {
    const movie = new this.movieModel(dto);
    await movie.save();

    return movie;
  }

  async getForUser(id: string, paginationParams?: PaginateQueryDto) {
    const { limit, skip } = paginationParams;

    const isUserExists = await this.userService.exists({ _id: id });

    if (!isUserExists) throw new NotFoundException();

    const response = await this.paginateService.paginatedResponse(
      this.movieModel,
      {
        limit,
        skip,
      },
      { owner: id },
      { populate: 'owner' },
    );

    return response;
  }

  async update(id: string, dto: Partial<MovieDto>) {
    return await this.movieModel.findByIdAndUpdate(id, dto);
  }
}
