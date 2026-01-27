import { cleanupOpenApiDoc } from 'nestjs-zod';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import z from 'zod';

async function bootstrap() {
  z.config(z.locales.pt());
  const config = new DocumentBuilder()
    .setTitle('Template Nest')
    .setDescription(
      'Template com autentificação cadastro de usuários, endereços, produtos inteiros e fracionados',
    )
    .setVersion('0.0.1')
    .build();

  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, cleanupOpenApiDoc(document));
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
