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
import { ClientModule } from './client/client.module';
import { ConfigModule } from '@nestjs/config';
import { APP_CONFIG } from './config/app.config';
import { DATABASE_CONFIG } from './config/database.config';
import configuration from './config/configuration';
import { AdminModule } from './admin/admin.module';
import { DbConnection } from './mongodb-mon/mongodb-mon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { FileUploadModule } from './fileupload/file.module';
const cors = require('cors');

@Module({
  imports: [
    // UserModule,
    // BookmarkModule,
    CatsModule,
    // ClientModule,
    // AdminModule,
    FileUploadModule,
    ConfigModule.forRoot({
      // envFilePath: '.development.env',
      cache: true,
      load: configuration,
      expandVariables: true,
      isGlobal: true,
    }),
    // DbConnection,
    // MongooseModule.forRoot('mongodb://127.0.0.1:27017/nestjs-db'),
    // CacheModule.register({ isGlobal: true, ttl: 1500 }),
    EventEmitterModule.forRoot()
  ],
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
    consumer.apply(cors(), checkauthentication).forRoutes({
      path: 'user',
      method: RequestMethod.GET | RequestMethod.POST,
    });
  }
}
// export class AppModule{};
