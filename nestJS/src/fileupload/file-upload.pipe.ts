import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { FileUploadDto } from './file-upload.dto';

export class FileUploadPipe implements PipeTransform {
  transform(value: FileUploadDto, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException('File is required');
    }
    return value;
  }
}
