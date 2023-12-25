import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import path from 'path';

export const multerOptions: MulterOptions = {
  dest: path.join(__dirname, 'uploads'),
};
