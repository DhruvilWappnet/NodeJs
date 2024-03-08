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
import { U1Module } from './u1/u1.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { DatabaseSqlModule } from './database-sql/database-sql.module';
import { PhotoModule } from './photo/photo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { People } from './people/people.entity';
import { PeopleModule } from './people/people.module';
import { Photo } from './photo/photo.entity';
const cors = require('cors');

@Module({
  imports: [
    // UserModule,
    BookmarkModule,
    CatsModule,
    // ClientModule,
    // AdminModule,
    // FileUploadModule,
    ConfigModule.forRoot({
      // envFilePath: '.development.env',
      cache: true,
      load: configuration,
      expandVariables: true,
      isGlobal: true,
    }),
    // DbConnection,
    // MongooseModule.forRoot('mongodb://127.0.0.1:27017/nestjs-db'),
    CacheModule.register({ isGlobal: true, ttl: 1500 }),
    EventEmitterModule.forRoot(),
    U1Module,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    // DatabaseSqlModule,
    PhotoModule,

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test2',
      entities: [People, Photo],
      synchronize: true,
    }),
    PeopleModule,
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
