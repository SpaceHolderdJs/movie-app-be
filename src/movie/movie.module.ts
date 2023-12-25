import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { Movie, MovieSchema } from './movie.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { PaginateService } from 'src/paginate/paginate.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
    UserModule,
    CloudinaryModule,
  ],
  providers: [MovieService, PaginateService],
  controllers: [MovieController],
  exports: [MovieService],
})
export class MovieModule {}
