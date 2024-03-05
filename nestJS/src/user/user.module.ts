import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { userService } from './user.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { NewUserInterceptor } from './user.interceptor';


@Module({
  controllers: [UserController],
  providers: [
    userService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: NewUserInterceptor,
    // },
  ],
})
export class UserModule {}
