import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('BootStrap');
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const PORT = process.env.PORT || configService.get('PORT');

  await app.listen(Number(PORT), () =>
    logger.log(`Server started on port ${PORT}`),
  );
}
bootstrap();
