import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

interface Jwtconfig {
  'JWT.SECRET': string;
  'JWT.EXPIRE_TIME': number;
}

@Injectable()
export class BookmarkService {
  // constructor(private readonly configService: ConfigService) {
  //   const user = this.configService.get<string>('DATABASE_USER');
  //   const emailnew = this.configService.get<string>('SUPPORT_EMAIL');
  //   const port = this.configService.get('DATABASE.PORT');
  //   const databaseurl = this.configService.get('DATABASE.url');
  //   console.log(user, port, databaseurl);
  // }

  constructor(
    private readonly configService: ConfigService<Jwtconfig>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private eventEmitter: EventEmitter2,
  ) {
    this.eventEmitter.on('eventName', (data: any) => {
      // Handle the emitted event
      console.log('Received event:', data);
    });
    const secret = this.configService.get<string>('JWT.SECRET');
    const expireTime = this.configService.get('JWT.EXPIRE_TIME');
    // this.dataadding();
    // console.log("\n[UsersService]: Jwt config with an Interface | Configuration Data Type");
    // console.log(secret, expireTime);
  }

  async dataadding() {
    await this.cacheManager.set('key', 'valuefwefwef');
    const data = await this.cacheManager.get('key');
    console.log('data form cachjemanage:' + data);
    // await this.cacheManager.del('key');
    // await new Promise((resolve, reject) => {
    setTimeout(async () => {
      const data1 = await this.cacheManager.get('key');
      console.log('data form cachjemanage:' + data1);
      // return resolve('fer');
    }, 3000);
    // });
  }
  @OnEvent('eventName')
  emitEvent(data: any) {
    this.eventEmitter.emit('eventName', data);
  }
}
