import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ENV } from './env';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { PaginateService } from './paginate/paginate.service';

console.log(ENV);

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${ENV.DB_USER_NAME}:${ENV.DB_PASSWORD}@main.2p6yd.mongodb.net/movie-app?retryWrites=true&w=majority`,
      {},
    ),
    UserModule,
    MovieModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService, PaginateService],
})
export class AppModule {}
