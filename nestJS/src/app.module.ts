import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { CatsModule } from './cats/cats.module';
import { APP_GUARD, APP_INTERCEPTOR, NestApplication } from '@nestjs/core';
import { RolesGuard } from './roles.guard';
import { NewUserInterceptor } from './user/user.interceptor';
import { checkauthentication } from './middleware/auth.middleware';
const cors = require('cors');

@Module({
  imports: [UserModule, BookmarkModule, CatsModule],
  // providers:[{
  //   provide: APP_GUARD,
  //   useClass: RolesGuard,
  // },]
  // providers:[
  //   {
  //     provide:APP_INTERCEPTOR,
  //     useClass:NewUserInterceptor
  //   }
  // ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cors(),checkauthentication)
      .forRoutes({ path: 'user', method: RequestMethod.GET|RequestMethod.POST });
  }
}
// export class AppModule{};