import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get ConfigService
  const configService = app.get(ConfigService);

  // Enable CORS for frontend development
  const frontendUrl = configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';
  app.enableCors({
    origin: frontendUrl,
    credentials: true,
  });

  // Global validation pipe for DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,                 // remove unknown properties
      forbidNonWhitelisted: true,      // throw error on extra props
      transform: true,                 // auto-transform payloads to DTO instances
      transformOptions: { enableImplicitConversion: true }, // for nested DTOs & auto-conversion
    }),
  );

  // Swagger setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle('School Management API')
    .setDescription('API documentation for School Management system')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // Start server
  const port = configService.get<number>('PORT') || 5000;
  await app.listen(port);

  console.log(`🚀 Server running at http://localhost:${port}`);
  console.log(`📚 Swagger docs available at http://localhost:${port}/api`);
}

bootstrap();
