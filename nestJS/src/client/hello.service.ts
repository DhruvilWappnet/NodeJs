import { Inject, Injectable, Scope } from '@nestjs/common';
import { INQUIRER } from '@nestjs/core';
import { Appservice } from './app.service';

@Injectable({ scope: Scope.TRANSIENT })
export class Helloservice {
  constructor(@Inject(INQUIRER) private parentclass: object) {}

  sayhello(message: string) {
    console.log(`${this.parentclass?.constructor?.name}:${message}`);
  }
}
