import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { Appservice } from './app.service';
import { LazyModuleLoader } from '@nestjs/core';

@Controller('hello')
export class HelloController implements OnModuleInit {
  onModuleInit() {
    console.log('App Controller is initialized');
  }
  constructor(
    private readonly appservice: Appservice,
    private lazyLoaderModule: LazyModuleLoader,
  ) {
    this.appservice.getroot();
    // this.lazyLoaderModule.load(()=>{});
  }

  @Get()
  getData() {
    this.appservice.getroot();
    return 'DHruvil';
  }
}
