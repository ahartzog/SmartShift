import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Make this config/environment dependant when it is hosted online
  app.enableCors({
    origin: '*',
    credentials: true,
    //preflightContinue: false,
  });
  await app.listen(3080);
}
bootstrap();
