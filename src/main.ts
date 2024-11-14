import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { resolveValidationError } from '@app/gateway/exception';
import { HttpExceptionFilter } from '@app/exception/http-exception';
import { LoggerFactoryService } from '@app/core/logger/logger-factory.service';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import {
  addBearerAuth,
  SWAGGER_ACCESS_TOKEN_KEY,
  SWAGGER_ADMIN_ACCESS_TOKEN_KEY,
} from '@app/gateway/swagger';
import { AppConfig } from './modules/config/config.type';

function setupSwagger(path: string, app: any) {
  let swaggerBuilder = new DocumentBuilder()
    .setTitle('Money Restful API')
    .setVersion('1.0');

  swaggerBuilder = addBearerAuth(
    swaggerBuilder,
    {
      key: SWAGGER_ACCESS_TOKEN_KEY,
      name: 'User Token',
    },
    {
      key: SWAGGER_ADMIN_ACCESS_TOKEN_KEY,
      name: 'Admin Token',
    },
  );
  const config = swaggerBuilder.build();

  const document = SwaggerModule.createDocument(app, config);
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
      cacheControl: false,
      etag: false,
    },
  };
  SwaggerModule.setup(path, app, document, customOptions);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logFactory = app.get(LoggerFactoryService);

  const appConfig: AppConfig = app.get(AppConfig);

  const logger = logFactory.createLogger(AppModule.name);

  app.useLogger(logger);

  app.useGlobalFilters(new HttpExceptionFilter(logFactory));

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {}),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      skipMissingProperties: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return resolveValidationError(errors);
      },
    }),
  );

  const swaggerPath = appConfig.server.swaggerPath;
  setupSwagger(swaggerPath, app);

  const port = appConfig.server.httpPort;
  await app.listen(port);
  logger.info(`Application is running on: ${await app.getUrl()}`);
  process.on('uncaughtException', (err) => {
    logger.critical('Application exception', err);
    process.exit(1);
  });
}
bootstrap();
