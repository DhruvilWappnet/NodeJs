import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Session,
  StreamableFile,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileUploadPipe } from './file-upload.pipe';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Request, Response } from 'express';
import { multerConfig } from './multer.config';

@Controller('file-upload')
export class FileUploadControllers {
  @Get()
  printname(@Res() res: Response) {
    const file = createReadStream(join(process.cwd(), 'src/files/Daily.txt'));
    // console.log(file);
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="package.json"',
    });
    console.log('hello');
    file.pipe(res);
    // return new StreamableFile(file);
    // return 'flandkflknf';
  }

  @Post()
  @UseInterceptors(FilesInterceptor('files', 10, multerConfig))
  @UsePipes(new FileUploadPipe())
  async uploadFile(
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: Request,
  ) {
    const imageUrl = files;
    console.log(req.body);
    return { message: 'File uploaded successfully' };
  }

  @Get('name')
  findAll(@Session() session: Record<string, any>) {
    console.log(session.visits);
    session.visits = session.visits ? session.visits + 1 : 1;
  }
}
