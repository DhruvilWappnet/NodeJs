import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Req,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { userService } from './user.service';
import { User } from './user.interface';
import { CustomExceptionFilter } from './exception.filter';
import {
  NewExceptionHere,
  NotFoundExceptionByuser,
} from './forbidden.exception';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { ParseDataPipeline } from './parse-data.pipe';
import { CreateUserDto } from './user.schema';
import { customvalidatiopipe } from './validation.pipe';
import { Authguard } from './auth.guard';
import { Roles } from 'src/roles.decorator';
import { NewUserInterceptor } from './user.interceptor';
import { Request } from 'express';
import { TransformInterceptor } from './transform.interceptor';
import { Combine, UserFormat } from './user.decorator';

@Controller('user')

// @UseFilters(AllExceptionsFilter)
export class UserController {
  constructor(private readonly userservice: userService) {}

  @Get('/newuser')
  checkuser(@UserFormat() user1) {
    console.log(user1);
  }

  @Get()
  @Combine()
  // @UseInterceptors(TransformInterceptor)
  findall(): User[] {
    return this.userservice.findall();
  }

  @Get(':id')
  // @Roles(['admin'])
  // @UseGuards(Authguard)
  // @UseInterceptors(NewUserInterceptor)
  @UsePipes(ParseIntPipe)
  finduser(@Param('id', ParseDataPipeline) id: number, @Req() req: Request) {
    let ans = this.userservice.finduser(id);
    const id1 = req.body.id;
    console.log(id);
    return this.userservice.finduser(id);
    // return { id: id1 };
  }

  @Post()
  // @Roles(['admin'])
  @UsePipes(new customvalidatiopipe())
  @UseFilters(CustomExceptionFilter)
  createuser(@Body() createUserDto: any, @Body() user: User) {
    console.log(createUserDto);
    return this.userservice.create(user);
  }

  @Patch(':id')
  // @Roles(['admin'])
  updateuser(
    @Query('activeOnly', new DefaultValuePipe(true), ParseBoolPipe)
    activeOnly: boolean,
    @Param('id') id: number,
    @Body() user: User,
  ) {
    console.log(activeOnly);
    return this.userservice.update(id, user);
  }

  @Delete(':id')
  // @Roles(['admin'])
  // @UseInterceptors(NewUserInterceptor)
  @UseFilters(CustomExceptionFilter)
  deleteuser(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    console.log(typeof id);
    console.log('updation');
    return this.userservice.delete(id);
  }
}
