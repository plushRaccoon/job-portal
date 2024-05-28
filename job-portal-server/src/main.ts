import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, { cors: true });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(process.env.NEST_PORT || 5000);
  } catch (error) {
    console.error('Error starting server:', error);
  }
}
bootstrap();
