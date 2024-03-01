import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}

export class NotFoundExceptionByuser extends HttpException {
  constructor() {
    super('Not_Found', HttpStatus.NOT_FOUND);
  }
}
