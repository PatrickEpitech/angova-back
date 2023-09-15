import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });
    await app.listen(3000);
}

bootstrap()
    .then(() => {
      console.log('Application is running');
    })
    .catch((error) => {
      console.error('Error starting the application:', error);
    });
