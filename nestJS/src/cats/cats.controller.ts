import {
  Controller,
  Get,
  ParseFilePipe,
  Post,
  Scope,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { Anotherservice } from './cats.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileSizeValidateionPipe } from './filevalidation.pipe';

@Controller({ path: 'cats', scope: Scope.REQUEST })
export class catscontroller {
  constructor(private readonly anotherService: Anotherservice) {}

  @Get('first')
  getservice() {
    return this.anotherService.getDataFromCustomService();
    // return "ferf";
  }

  @Get('second')
  getvalue() {
    return this.anotherService.getCustomValue();
    // return "wefw";
  }

  @Post('third')
  @UseInterceptors(FileInterceptor('file'))
  // @UsePipes(FileSizeValidateionPipe)
  uploadfile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
