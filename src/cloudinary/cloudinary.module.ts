import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryInterceptor } from './cloudinary.interceptor';

@Module({
  providers: [CloudinaryService, CloudinaryInterceptor],
  exports: [CloudinaryService, CloudinaryInterceptor],
})
export class CloudinaryModule {}
