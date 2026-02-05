import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from 'src/app.module';
import { InMemoryUserRepository } from 'src/tests/mocks/in-memory-user-repository';
import { UserRepository } from 'src/domain/users/user.repository';

describe('POST /auth/signup', () => {
  let app: INestApplication<App>;
  let userRepository: InMemoryUserRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UserRepository)
      .useClass(InMemoryUserRepository)
      .compile();

    app = moduleFixture.createNestApplication();

    userRepository = moduleFixture.get<InMemoryUserRepository>(UserRepository);

    userRepository.users = [];
    await app.init();
  });

  describe('Anonymous user', () => {
    test('creating a user with an invalid number', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({ phone: '12345' })
        .expect(400)
        .expect({
          message:
            'O número de telefone informado é inválido para qualquer região global.',
          statusCode: 400,
          error: 'Erro em "phone"',
        });
    });

    test('creating a user with a name that is too short', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({ phone: '+5511999999999', name: 'A' })
        .expect(400)
        .expect({
          message: 'O nome deve ter entre 2 e 100 caracteres.',
          statusCode: 400,
          error: 'Erro em "name"',
        });
    });

    test('creating a user without a last name', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({ phone: '+5511999999999', name: 'Jose' })
        .expect(400)
        .expect({
          message: 'O sobrenome é obrigatório.',
          statusCode: 400,
          error: 'Erro em "name"',
        });
    });

    test('creating a user with a name that contains punctuation', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({ phone: '+5511999999999', name: 'Jose!!! Silva' })
        .expect(400)
        .expect({
          message: 'O nome deve conter apenas letras e espaços.',
          statusCode: 400,
          error: 'Erro em "name"',
        });
    });

    test('creating a user with an abbreviated name', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({ phone: '+5511999999999', name: 'J Silva' })
        .expect(400)
        .expect({
          message: 'O nome não deve conter abreviações.',
          statusCode: 400,
          error: 'Erro em "name"',
        });
    });

    test('creating a user with a name that is too long', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          phone: '+5511999999999',
          name: `${Array.from({ length: 101 }, () => 'a').join('')}`,
        })
        .expect(400)
        .expect({
          message: 'O nome deve ter entre 2 e 100 caracteres.',
          statusCode: 400,
          error: 'Erro em "name"',
        });
    });

    test('creating a user with invalid data', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send()
        .expect(400)
        .expect({
          message: 'Tipo inválido: esperado object, recebido undefined',
          statusCode: 400,
          error: 'Erro em ""',
        });
    });

    test('creating a user with valid data', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({ phone: '+5511999999999', name: 'Jose da Silva' })
        .expect(201)
        .expect((res) => {
          const { otp_token } = res.body as { otp_token: string };

          const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;

          if (!jwtRegex.test(otp_token)) {
            throw new Error('O otpToken não é um JWT válido');
          }
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
