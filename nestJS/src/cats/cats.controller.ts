import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  ParseFilePipe,
  Post,
  Query,
  Req,
  Scope,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { Anotherservice } from './cats.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileSizeValidateionPipe } from './filevalidation.pipe';
import { Request } from 'express';
import { CreateCatDto, UserRole } from './cats.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiProperty,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';

// { path: 'cats', scope: Scope.REQUEST }
@Controller({ path: 'cats' })
@ApiTags('Cats')
export class catscontroller {
  constructor(private readonly anotherService: Anotherservice,private jwtService:JwtService) {}

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

  @Post('createcat')
  @ApiResponse({
    description: 'Cat is created',
    status: HttpStatus.ACCEPTED,
    type: CreateCatDto,
  })
  @ApiCreatedResponse({ description: 'Cat is created' })
  @ApiBadRequestResponse({ description: 'format is not proper' })
  createCat(@Req() req: Request, @Body() creatCatDto: CreateCatDto) {
    return this.anotherService.createcat(creatCatDto);
  }

  @Get('getbyrole')
  @ApiQuery({ name: 'role', enum: UserRole })
  getbyrole(@Query('role') role: UserRole = UserRole.User) {
    return `Success by role: ${role}`;
  }

  @Get()
  getjwt() {
    const payload = {
      user: 'Dhruvil',
      password: 'lkne2312',
    };
    const token=this.jwtService.sign(payload);
    console.log(token);
    return token;
  }
}
