import { Catch, HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenExceptionNew extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}

export class NotFoundExceptionByuser extends HttpException {
  constructor() {
    super('Not_Found', HttpStatus.NOT_FOUND);
  }
}

@Catch()
export class NewExceptionHere {
  constructor() {
    console.log('Error is invoking for New exception filter');
  }
}
