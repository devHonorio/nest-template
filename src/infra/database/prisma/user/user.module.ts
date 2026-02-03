import { Module } from '@nestjs/common';
import { UserRepository } from 'src/domain/users/user.repository';
import { PrismaUserRepository } from './user.service';
import { UserService } from 'src/domain/users/user.service';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    UserService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserRepository, UserService],
})
export class UserModule {}
