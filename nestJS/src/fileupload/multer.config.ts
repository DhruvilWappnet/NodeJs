import { diskStorage } from 'multer';
import { join } from 'path';

export const multerConfig = {
  storage: diskStorage({
    // destination: join(__dirname, '../..', 'src/files'),
    destination: (req, file, callback) => {
        callback(null, join(__dirname, '../..', 'src/files')); // Set the destination folder
      },
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      console.log(__dirname);
    //   callback(null, `${file.fieldname}-${uniqueSuffix}`);
      callback(null, `${file.originalname}`);
    },
  }),
};
