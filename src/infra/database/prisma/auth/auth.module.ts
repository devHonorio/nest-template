import { Module } from '@nestjs/common';
import { UserService } from 'src/domain/users/user.service';
import { PrismaService } from '../prisma.service';
import { AuthController } from 'src/api/v1/controllers/auth/auth.controller';
import { UserModule } from '../user/user.module';
import { AuthService } from 'src/domain/auth/auth.service';
import { AuthRepository } from 'src/domain/auth/auth.repository';
import { PrismaAuthRepository } from './auth.service';
import { EncrypterRepository } from 'src/domain/auth/encrypter.repository';
import { JwtEncrypterRepository } from 'src/infra/auth/jwt/encrypter/encrypter.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserModule],
  providers: [
    UserService,
    PrismaService,
    AuthService,
    JwtService,
    {
      provide: AuthRepository,
      useClass: PrismaAuthRepository,
    },
    { provide: EncrypterRepository, useClass: JwtEncrypterRepository },
  ],
  controllers: [AuthController],
})
export class PrismaAuthModule {}
