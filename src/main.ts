import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable ValidationPipe globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips non-whitelisted properties
      forbidNonWhitelisted: true, // throws error if non-whitelisted properties are present
      transform: true, // automatically transform payloads to DTO instances
    }),
  );

  // Enable CORS
  app.enableCors({
    origin: process.env.CORS_ALLOW_ORIGIN || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

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
