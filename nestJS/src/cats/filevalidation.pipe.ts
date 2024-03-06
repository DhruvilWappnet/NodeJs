import {
  ArgumentMetadata,
  ForbiddenException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FileSizeValidateionPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const filesize = 1000;
    // if (value.size > filesize) {
    //   throw new ForbiddenException();
    // }
    // return value;

    return value.size<filesize;
  }
}
