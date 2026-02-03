import { Module } from '@nestjs/common';
import { PrismaService } from './infra/database/prisma/prisma.service';
import { PrismaAuthModule } from './infra/database/prisma/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { JwtConfigModule } from './infra/auth/jwt/jwt.config.module';
import { ValidationModule } from './infra/validation/zod/validation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    ValidationModule,
    PrismaAuthModule,
    JwtConfigModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
