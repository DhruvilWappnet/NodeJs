import {
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Injectable,
  NestMiddleware,
  Optional,
} from '@nestjs/common';
import { error } from 'console';
import { NextFunction, Request, Response } from 'express';
export class UserAgentOptions {
  accepted?: string[];
}

export function checkauth(req: Request, res: Response, next: NextFunction) {
  const user = req.headers['user-agent'];
  console.log(user);
  req['user'] = user;
  console.log('Middleware is passed ');

  throw new Error();

  res.json({ msg: 'fewfwe' });
  //   next();
}

@Injectable()
export class checkauthentication implements NestMiddleware {
  constructor(@Optional() private options: UserAgentOptions) {}

  use(req: any, res: any, next: (error?: any) => void) {
    console.log('Class based middlware is called ');
    const user = req.headers['user-agent'];
    if (!this.checkprovide(user)) {
      // res.status(HttpStatus.FORBIDDEN).json({ meg: 'aldfnjkfn' });
      throw new ForbiddenException();
    }
    next();
  }
  
  private checkprovide(useragent: string) {
    const acceptable = ['chrome', 'firefox', 'brave','postman'];

    return acceptable.some((agent) =>
      useragent.toLowerCase().includes(agent.toLowerCase()),
    );
    // return useragent.toLowerCase() === ;
  }
}
