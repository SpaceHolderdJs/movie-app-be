import { Injectable } from '@nestjs/common';
import { UploadApiOptions, UploadApiResponse } from 'cloudinary';
import { resolve } from 'path';
import { cloudinaryUploader } from './cloudinary.config';
import { RequestWithFile } from 'src/types';

@Injectable()
export class CloudinaryService {
  async uploadSingle(
    req: RequestWithFile,
    opt: UploadApiOptions,
  ): Promise<UploadApiResponse> {
    return await cloudinaryUploader.upload(req.file.path, opt);
  }

  async uploadMultiple(
    req: RequestWithFile,
    opt: UploadApiOptions,
  ): Promise<UploadApiResponse[]> {
    const fileResponseArray = [];
    for await (const file of req.files) {
      const fileResponse = await cloudinaryUploader.upload(file.path, opt);
      fileResponseArray.push(fileResponse);
    }
    return fileResponseArray;
  }
}
