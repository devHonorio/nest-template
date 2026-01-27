import { ZodValidationPipe, ZodSerializerInterceptor } from 'nestjs-zod';
import {
  APP_PIPE,
  APP_INTERCEPTOR,
  APP_FILTER,
  BaseExceptionFilter,
} from '@nestjs/core';
import { Module, HttpException, ArgumentsHost, Catch } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthController } from './auth/auth.controller';
import { Response } from 'express';

@Catch(HttpException)
class HttpExceptionFilter extends BaseExceptionFilter {
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

      const firstError = errors[0];

      return response.status(status).json({
        message: firstError.message,
        statusCode: status,
        error: `Erro em ${firstError.path.join('/')}`,
      });
    }

    super.catch(exception, host);
  }
}

@Module({
  imports: [],
  controllers: [AppController, AuthController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodSerializerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
