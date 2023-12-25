import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { RequestWithFile } from 'src/types';

@Injectable()
export class CloudinaryInterceptor implements NestInterceptor<RequestWithFile> {
  constructor(private cloudinaryService: CloudinaryService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const httpContext = context.switchToHttp();

    const request = httpContext.getRequest<RequestWithFile>();

    const file = request.file;
    const files = request.files;

    if (file) {
      try {
        const cloudinaryResponse = await this.cloudinaryService.uploadSingle(
          request,
          {
            folder: `movies`,
          },
        );

        request.body[file.fieldname] = cloudinaryResponse.url;
      } catch (e) {
        throw new InternalServerErrorException();
      }
    }

    if (files) {
      try {
        const cloudinaryResponses = await this.cloudinaryService.uploadMultiple(
          request,
          { folder: `movies` },
        );

        request.body[files[0].fieldname] = cloudinaryResponses.map(
          (filesResponse) => filesResponse.url,
        );
      } catch (e) {
        throw new InternalServerErrorException();
      }
    }

    return next.handle();
  }
}
