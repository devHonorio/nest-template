import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../users/entities/User';
import { AuthRepository } from './auth.repository';
import { EncrypterRepository } from './encrypter.repository';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private authRepository: AuthRepository,
    private encrypterRepository: EncrypterRepository,
  ) {}

  async signup(user: User) {
    const createdUser = await this.userService.createUser(user);

    if (!createdUser) {
      throw new BadRequestException('Dados inválidos para criação de usuário.');
    }

    // provisório até implementar serviço de envio de OTP
    console.log(
      `Enviando OTP para o número de telefone do usuário: ${user['phone']}`,
    );

    // provisório até implementar uma fila com redis ou rabbitmq
    // apaga o OTP e o usuário após 5 minutos se não for confirmado
    const FIVE_MINUTES_IN_SECONDS = 5 * 60;

    setTimeout(() => {
      this.userService
        .findUserById(user.id)
        .then(async (existUser) => {
          if (existUser && !existUser.verified) {
            await this.authRepository.deleteTokenAndUserByUserId(existUser.id);

            console.log(
              `Usuário com telefone ${user.phone} não confirmou o OTP a tempo. Usuário e OTP removido.`,
            );
          }
        })
        .catch((err) => {
          console.error(
            'Erro ao verificar usuário para remoção após timeout:',
            err,
          );
        });
    }, FIVE_MINUTES_IN_SECONDS * 1000);

    const otpToken = await this.encrypterRepository.generateToken(
      createdUser.id,
      FIVE_MINUTES_IN_SECONDS,
    );
    return { otp_token: otpToken };
  }
}
