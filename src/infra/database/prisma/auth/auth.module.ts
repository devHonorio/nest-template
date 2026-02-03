import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AuthController } from 'src/api/v1/controllers/auth/auth.controller';
import { UserModule } from '../user/user.module';
import { AuthService } from 'src/domain/auth/auth.service';
import { AuthRepository } from 'src/domain/auth/auth.repository';
import { PrismaAuthRepository } from './auth.service';
import { JwtModule } from 'src/infra/auth/jwt/jwt.module';

@Module({
  imports: [UserModule, JwtModule],
  providers: [
    AuthService,
    PrismaService,
    {
      provide: AuthRepository,
      useClass: PrismaAuthRepository,
    },
  ],
  controllers: [AuthController],
})
export class PrismaAuthModule {}
