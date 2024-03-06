import {
  BeforeApplicationShutdown,
  Module,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Appservice } from './app.service';
import { Helloservice } from './hello.service';
import { HelloController } from './hello.controller';
import { clientService } from './client.service';
import { commanService } from './common.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [HelloController],
  providers: [Appservice, Helloservice, clientService, commanService],
  imports: [ConfigModule],
})
// export class ClientModule
//   implements
//     OnModuleInit,
//     OnModuleDestroy,
//     OnApplicationBootstrap,
//     BeforeApplicationShutdown,
//     OnApplicationShutdown
// {
//   onModuleInit() {
//     console.log('Hello client modulre in intialized');
//   }
//   onApplicationBootstrap() {
//     console.log('client module application is bootstreped');
//   }
//   beforeApplicationShutdown(signal?: string) {
//     console.log('application is being shutdown');
//   }
//   async onApplicationShutdown(signal?: string) {
//     await new Promise<void>((resolve) => {
//       setTimeout(() => {
//         console.log('application is shutdown , now');
//         resolve();
//       }, 5000);
//     });
//     // console.log('application is shutdown , now');
//   }
//   onModuleDestroy() {
//     console.log('hwllo client module is destoryed');
//   }
// }
export class ClientModule {}
