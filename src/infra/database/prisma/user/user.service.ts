import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { User } from 'src/domain/users/entities/User';
import { UserRepository } from 'src/domain/users/user.repository';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { Prisma } from '../generated/client';

@Injectable()
export class PrismaUserRepository extends UserRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(user: User): Promise<User | null> {
    try {
      const createdUser = await this.prisma.user.create({
        data: {
          name: user.name,
          phone: user.phone,
        },
        select: {
          id: true,
          name: true,
          phone: true,
          verified: true,
        },
      });

      return new User({
        id: createdUser.id,
        name: createdUser.name,
        phone: createdUser.phone,
        verified: createdUser.verified,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        return null;
      }

      console.error('Erro ao criar usuário:', error);
      throw new ServiceUnavailableException(
        'Erro no banco de dados. Tente novamente mais tarde.',
      );
    }
  }

  async deleteById(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    const foundUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        phone: true,
        verified: true,
      },
    });

    if (!foundUser) {
      return null;
    }

    return new User({
      id: foundUser.id,
      name: foundUser.name,
      phone: foundUser.phone,
      verified: foundUser.verified,
    });
  }
}
