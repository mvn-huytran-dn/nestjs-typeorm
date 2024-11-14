import {
  addBearerAuth,
  SWAGGER_ACCESS_TOKEN_KEY,
  SWAGGER_ADMIN_ACCESS_TOKEN_KEY,
} from '@app/gateway/swagger';
import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerModule,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

export function setupSwagger(path: string, app: INestApplication<any>) {
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
