import {
  BadGatewayException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

@Injectable()
export class NewUserInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    req.body = { ...req.body, id: 100 };
    console.log('Before...');
    console.log(context.getClass());
    const now = Date.now();
    console.log(now);
    return next.handle().pipe(
      tap(() => console.log(`${Date.now()},After... ${Date.now() - now}ms`)),
      catchError((err) => throwError(() => new BadGatewayException())),
      map(data=>{
        const newdata="fwrfw";
        return {data,newdata};
      })
    );
  }
}
