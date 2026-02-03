import { Module } from '@nestjs/common';
import { AuthController } from 'src/api/v1/controllers/auth/auth.controller';
import { PrismaAuthModule } from 'src/infra/database/prisma/auth/auth.module';

@Module({
  imports: [PrismaAuthModule],
  controllers: [AuthController],
})
export class AuthModule {}
