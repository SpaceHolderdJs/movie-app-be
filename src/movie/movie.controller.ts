import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieDto } from './dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryInterceptor } from 'src/cloudinary/cloudinary.interceptor';
import { multerOptions } from 'src/multer.config';

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

  @Get('/')
  async getForUser(@Param('email') email: string) {
    return await this.movieService.getForUser(email);
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
