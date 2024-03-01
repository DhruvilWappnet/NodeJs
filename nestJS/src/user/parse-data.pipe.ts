import { Injectable, PipeTransform, Type } from '@nestjs/common';

@Injectable()
export class ParseDataPipeline implements PipeTransform {
  transform(value: string | number, metadata: ArgumentMetadata) {
    // console.log(metadata.metatype);
    // console.log(value);
    return value;
  }
}
interface ArgumentMetadata {
  type: 'body';
  metatype?: Type<unknown>;
  data?: string;
}
