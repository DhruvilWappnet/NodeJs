import {
  ExecutionContext,
  applyDecorators,
  createParamDecorator,
} from '@nestjs/common';

export const UserFormat = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const userData = { id: 123, username: 'john_doe' };
    request.normal = userData;
    console.log('Decorator is activated.....???????');
    return request.body;
  },
);

function newfun(){
  console.log("fwefwef");
}

export const Combine = (...roles) => {
  return applyDecorators(UserFormat,newfun);
};
