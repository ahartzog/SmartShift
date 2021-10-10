import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Make this config/environment dependant when it is hosted online
  app.enableCors({
    origin: '*',
    credentials: true,
    //preflightContinue: false,
  });
  app.useWebSocketAdapter(new WsAdapter(app));
  const envPort = app.get(ConfigService).get('PORT');
  const PORT = envPort || 443;
  await app.listen(PORT);
}
bootstrap();
