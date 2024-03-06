import { Inject, Injectable, OnModuleInit, forwardRef } from '@nestjs/common';
import { commanService } from './common.service';
import { ModuleRef } from '@nestjs/core';
import { CustomService } from 'src/cats/custome.providers';
import { resolve } from 'path';

@Injectable()
export class clientService implements OnModuleInit {
  // async onModuleInit() {
  //   await new Promise<void>(resolve => {
  //     setTimeout(() => {
  //       console.log('Client service is initialized after 5 seconds');
  //       resolve();
  //     }, 5000);
  //   });
  // }
  onModuleInit() {
    console.log('Client service is initialized');
  }
  //   constructor(
  // @Inject(forwardRef(() => commanService))
  // private commanservice: commanService,
  //   ) {}
  constructor(private readonly moduleRef: ModuleRef) {}

  getservice() {
    this.moduleRef.get(CustomService);
  }
}
