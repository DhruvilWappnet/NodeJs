import { CanActivate, ExecutionContext, Injectable, Optional } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { request } from 'http';
import { Observable } from 'rxjs';
import { Roles } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(@Optional() private reflactor: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // return validaterole(request);
    const role = this.reflactor.get(Roles, context.getHandler());
    const user = request.body.role;
    console.log("Role is here: "+role);
    console.log("User is here: "+user);
    return validaterole(role, request);
    return true;
  }
}

const validaterole = (role, request) => {
  const user = request.body.role;
  return user==role;
};

// const validaterole = (request) => {
//   if (request.body.role === 'admin') return true;
//   return false;
// };
