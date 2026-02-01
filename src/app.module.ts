import { ZodValidationPipe, ZodSerializerInterceptor } from 'nestjs-zod';
import {
  APP_PIPE,
  APP_INTERCEPTOR,
  APP_FILTER,
  BaseExceptionFilter,
} from '@nestjs/core';
import { Module, HttpException, ArgumentsHost, Catch } from '@nestjs/common';
import { PrismaService } from './infra/database/prisma/prisma.service';
import { Response } from 'express';
import { PrismaAuthModule } from './infra/database/prisma/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { JwtNestModule } from './infra/auth/jwt/jwt.module';

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

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    PrismaAuthModule,
    JwtNestModule,
  ],
  controllers: [],
  providers: [
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
