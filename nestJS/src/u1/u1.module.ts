import { Module } from '@nestjs/common';
import { U1Service } from './u1.service';
import { U1Controller } from './u1.controller';

@Module({
  providers: [U1Service],
  controllers: [U1Controller]
})
export class U1Module {}
