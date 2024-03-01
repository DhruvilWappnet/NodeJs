import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';

@Catch()
export class CustomExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    if (exception instanceof Error) {
      status = HttpStatus.BAD_REQUEST; // For example, for validation errors
    }
    this.name();
    response.status(status).json({
      statusCode: status,
      message: exception.message || 'Internal Server Error',
    });
  }
  name() {
    console.log('Custom error filter is invoked');
  }
}
