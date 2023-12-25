import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieDto } from './dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryInterceptor } from 'src/cloudinary/cloudinary.interceptor';
import { multerOptions } from 'src/multer.config';
import { MongoObjectId } from 'src/types';
import { PaginateQueryDto } from 'src/paginate/dto';

@ApiTags('movie')
@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Post('/')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('imageUrl', multerOptions),
    CloudinaryInterceptor,
  )
  async create(@Body() body: MovieDto) {
    return await this.movieService.create(body);
  }

  @Get('/for-user/:id')
  async getForUser(
    @Param('id') id: string,
    @Query('limit') limit: number,
    @Query('skip') skip: number,
  ) {
    return await this.movieService.getForUser(id, { limit, skip });
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('imageUrl', multerOptions),
    CloudinaryInterceptor,
  )
  async update(@Body() dto: MovieDto, @Param('id') id: string) {
    return await this.movieService.update(id, dto);
  }
}
