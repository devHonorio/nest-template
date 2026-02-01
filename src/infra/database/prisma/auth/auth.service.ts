import { Injectable } from '@nestjs/common';
import { AuthRepository } from 'src/domain/auth/auth.repository';
import { UserService } from 'src/domain/users/user.service';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAuthRepository extends AuthRepository {
  constructor(
    private userService: UserService,
    private prismaService: PrismaService,
  ) {
    super();
  }
  async deleteTokenAndUserByUserId(userId: string): Promise<void> {
    await this.userService.deleteUserById(userId);
    await this.prismaService.authCode.delete({ where: { userId } });
  }
}
