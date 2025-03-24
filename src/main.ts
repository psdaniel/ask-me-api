import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Ask Me API')
    .setDescription('The Ask Me API documentation')
    .setVersion('1.0')
    .addTag('users')
    .addTag('resources')
    .addTag('answers')
    .addTag('questions')
    .build();

  // Use type assertion to fix the error
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
