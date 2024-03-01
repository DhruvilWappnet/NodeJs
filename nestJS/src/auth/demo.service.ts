import { Injectable } from "@nestjs/common";

@Injectable()
export class logService {
  log(name: string) {
    console.log('Hello your name is '+name);
  }
}
