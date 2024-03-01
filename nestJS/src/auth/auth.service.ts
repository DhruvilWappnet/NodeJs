import { Injectable } from '@nestjs/common';
import { logService } from './demo.service';

@Injectable({})
export class AuthService {
  constructor(private demoservice:logService) {}
  test() {
    console.log('Hello');
    this.demoservice.log("Dhruvil Prajapati");
  }
  signup() {
    return { msg: 'Success' };
  }
  login() {
    return { msg: 'Login succefull' };
  }
}
