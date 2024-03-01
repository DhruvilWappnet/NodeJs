import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
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

@Controller('user')
// @UseFilters(AllExceptionsFilter)
export class UserController {
  constructor(private readonly userservice: userService) {}

  @Get()
  findall(): User[] {
    return this.userservice.findall();
  }

  @Get(':id')
  @Roles(['admin'])
    // @UseGuards(Authguard)
  @UsePipes(ParseIntPipe)
  finduser(@Param('id', ParseDataPipeline) id: number): User {
    let ans = this.userservice.finduser(id);
    // console.log(ans);

    return this.userservice.finduser(id);
  }

  @Post()
  @Roles(['admin'])
  @UsePipes(new customvalidatiopipe())
  @UseFilters(CustomExceptionFilter)
  createuser(@Body() createUserDto: any) {
    console.log(createUserDto);
    // return this.userservice.create(user);
  }

  @Patch(':id')
  @Roles(['admin'])
  updateuser(
    @Query('activeOnly', new DefaultValuePipe(true), ParseBoolPipe)
    activeOnly: boolean,
    @Param('id') id: number,
    @Body() user: User,
  ) {
    console.log(activeOnly);
    return this.userservice.update(id, user);
  }
  //   @Get()
  //   async findAll(
  //     @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe)
  //     activeOnly: boolean,
  //     @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
  //   ) {
  //     console.log(activeOnly,page);
  //     return this.userservice.findall();
  //   }

  @Delete(':id')
  @Roles(['admin'])
  @UseFilters(CustomExceptionFilter)
  @UseInterceptors(NewUserInterceptor)
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
