import { DocumentBuilder } from '@nestjs/swagger';

export function addBearerAuth(
  builder: DocumentBuilder,
  ...tokenOptions: { key: string; name: string }[]
) {
  tokenOptions.forEach((opt) => {
    builder = builder.addBearerAuth(
      {
        description: `Please enter ${opt.name} token`,
        name: 'Authorization',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      opt.key,
    );
  });
  return builder;
}
export function addApiTag(
  builder: DocumentBuilder,
  ...tags: { name: string; description: string }[]
) {
  tags.forEach((tag) => {
    builder = builder.addTag(tag.name, tag.description);
  });
  return builder;
}
