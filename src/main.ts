import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'dotenv/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Interpreters API')
    .setDescription('Interpreters API description')
    .setVersion('1.0')
    .addTag('Interpreters')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
