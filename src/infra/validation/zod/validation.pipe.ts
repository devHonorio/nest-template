import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter extends BaseExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    if (exception.constructor.name === 'ZodValidationException') {
      const { errors } = exceptionResponse as {
        errors: {
          path: string[];
          message: string;
        }[];
      };

      if (!errors || errors.length === 0) {
        super.catch(exception, host);
        return;
      }

      const firstError = errors[0];
      return response.status(status).json({
        message: firstError.message,
        statusCode: status,
        error: `Erro em "${firstError.path.join('/')}"`,
      });
    }

    console.error(exception);

    super.catch(exception, host);
  }
}
