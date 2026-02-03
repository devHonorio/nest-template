import { Module } from '@nestjs/common';
import { PrismaService } from './infra/database/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { JwtConfigModule } from './infra/auth/jwt/jwt.config.module';
import { ValidationModule } from './infra/validation/zod/validation.module';
import { AuthModule } from './domain/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    ValidationModule,
    AuthModule,
    JwtConfigModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
