import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from 'src/domain/auth/auth.service';
import { AuthRepository } from 'src/domain/auth/auth.repository';
import { PrismaAuthRepository } from './auth.service';
import { JwtModule } from 'src/infra/auth/jwt/jwt.module';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [UserModule, JwtModule, PrismaModule],
  providers: [
    AuthService,
    {
      provide: AuthRepository,
      useClass: PrismaAuthRepository,
    },
  ],
  exports: [AuthService],
})
export class PrismaAuthModule {}
