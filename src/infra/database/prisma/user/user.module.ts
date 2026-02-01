import { Module } from '@nestjs/common';
import { UserRepository } from 'src/domain/users/user.repository';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { PrismaUserRepository } from './user.service';
import { UserService } from 'src/domain/users/user.service';

@Module({
  providers: [
    UserService,
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserRepository, UserService],
})
export class UserModule {}
