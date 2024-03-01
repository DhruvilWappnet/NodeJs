import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { userService } from './user.service';
import { User } from './user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userservice: userService) {}

  @Get()
  findall(): User[] {
    return this.userservice.findall();
  }

  @Get(':id')
  finduser(@Param('id') id: number): User {
    let ans = this.userservice.finduser(id);
    // console.log(ans);

    return this.userservice.finduser(id);
  }

  @Post()
  createuser(@Body() user: User): User {
    return this.userservice.create(user);
  }

  @Patch(':id')
  updateuser(@Param('id') id: number, @Body() user: User) {
    return this.userservice.update(id, user);
  }

  @Delete(':id')
  deleteuser(@Param('id') id: number) {
    return this.userservice.delete(id);
  }
}
