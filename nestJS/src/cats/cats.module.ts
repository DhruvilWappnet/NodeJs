import { Module } from '@nestjs/common';
import { customProviders } from './custome.providers';
import { catscontroller } from './cats.controller';
import { Anotherservice } from './cats.service';

@Module({
  controllers: [catscontroller],
  providers: [...customProviders, Anotherservice,
    {
      provide: 'ASYNC_CONNECTION',
      useFactory: async () => {
        console.log("hell from usefactory")
      },
    }
    ],
})
export class CatsModule {}
