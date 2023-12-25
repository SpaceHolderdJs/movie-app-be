import { Injectable } from '@nestjs/common';
import { Movie } from './movie.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MovieDto } from './dto';
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<Movie>,
    private userService: UserService,
  ) {}

  async create(dto: MovieDto) {
    const movie = new this.movieModel(dto);
    await movie.save();

    return movie;
  }

  async getForUser(dto: Partial<MovieDto> & { email: string }) {
    const { email } = dto;
    const [owner] = await this.userService.find({ email });

    const movies = await this.movieModel.find({ ...dto, owner: owner._id });
    return movies;
  }

  async update(id: string, dto: Partial<MovieDto>) {
    return await this.movieModel.findByIdAndUpdate(id, dto);
  }
}
