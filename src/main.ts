import { cleanupOpenApiDoc } from 'nestjs-zod';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import z from 'zod';
import { apiReference } from '@scalar/nestjs-api-reference';

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

  app.use(
    '/reference',
    apiReference({
      spec: {
        content: document,
      },
      theme: 'dark',
      layout: 'modern',
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `API is running at http://localhost:${process.env.PORT ?? 3000}/api`,
  );
  console.log(
    `Reference is running at http://localhost:${process.env.PORT ?? 3000}/reference`,
  );
}
void bootstrap();
