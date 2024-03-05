import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  Next,
  Header,
  Redirect,
  Param,
  Body,
  Ip,
  Inject,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { personFormat } from '.';

interface VideoParams {
  id: number;
  name: string;
}

let users = [];

@Controller('auth')
// @Controller({ host: ':localhost' })
export class AuthController {
  constructor(
    @Inject('store') private authService: AuthService,
    @Inject('Database_name') private name1,
  ) {}

  @Get('signup')
  signup() {
    // return 'hello i am dhruvil';
    this.authService.test();
    console.log(this.name1);
    return 'success';
  }

  @Get('login')
  //   @HttpCode(HttpStatus.OK)
  //   @Header('Cache-Control', 'none')
  //   @Redirect('/auth/signup', HttpStatus.PERMANENT_REDIRECT)
  login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Next() next,
  ) {
    console.log(req.query);
    // return this.authService.login();
    // next();
    res.status(200);
    res.json({ msg: 'responce is submitted fe' });
  }
}

//   @Get('first/:id/:name')
//   test(@Param() params: VideoParams, @Body() reqestdata: Record<string, any>) {
//     console.log(params.name);
//     return { msg: 'success' };
//   }

//   @Get('check/:id')
//   person(
//     @Param('id') id: number,
//     @Body() personDetails: personFormat,
//     @Ip() ip: string,
//   ) {
//     console.log(id);
//     console.log(ip);
//     users.push(23);
//     let pos = users.find((users) => users.id === +id);
//     return 'Success';
//   }
