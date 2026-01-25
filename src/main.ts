import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('Template Nest')
    .setDescription(
      'Template com autentificação cadastro de usuários, endereços, produtos inteiros e fracionados',
    )
    .setVersion('0.0.1')
    .build();

  const app = await NestFactory.create(AppModule);

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
