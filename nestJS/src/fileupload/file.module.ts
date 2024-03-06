import { Module } from '@nestjs/common';
import { FileUploadControllers } from './file-upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from './multer.config';

@Module({
  // imports: [MulterModule.register(multerConfig)],
  controllers: [FileUploadControllers],
})
export class FileUploadModule {}
