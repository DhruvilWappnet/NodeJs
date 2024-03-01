import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateUserschema } from './user.schema';

@Injectable()
export class customvalidatiopipe implements PipeTransform<any> {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException('No data submitted');
    }

    try {
      CreateUserschema.parse(value);
      return value;
    } catch (error) {
      throw new BadRequestException('Validation failed: ' + error.message);
    }
  }
}
