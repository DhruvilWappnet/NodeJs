import { Module } from '@nestjs/common';
import { customProviders } from './custome.providers';
import { catscontroller } from './cats.controller';
import { Anotherservice } from './cats.service';
import multer from 'multer';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [catscontroller],
  providers: [
    ...customProviders,
    Anotherservice,
    // {
    //   provide: 'ASYNC_CONNECTION',
    //   useFactory: async () => {
    //     console.log("hell from usefactory of cats")
    //   },
    // }
  ],
  imports: [MulterModule.register({ dest: '../files' })],
})
export class CatsModule {}
