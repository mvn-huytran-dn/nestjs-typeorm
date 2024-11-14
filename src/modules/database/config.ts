import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { DatabaseConfig } from './database.module-definition';
import { AppConfig } from '../config/config.type';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  dataSourceFactory: async (options) => {
    await new DataSource(options).initialize();
    const dataSource = await new DataSource(options).initialize();
    return dataSource;
  },
  inject: [AppConfig],

  useFactory: (config: AppConfig) => ({
    type: 'postgres',
    port: config.database.port,
    host: config.database.host,
    username: config.database.username,
    password: config.database.password,
    database: config.database.database,
    synchronize: true,
    dropSchema: false,
    autoLoadEntities: true,
    migrationsRun: false,
    retryAttempts: 10,
    retryDelay: 1000,
    logging: ['warn', 'error'],
    entities: ['dist/**/entities/*.entity{.ts,.js}'],
    seeds: ['src/database/seeders/**/*{.ts,.js}'],
    subscribers: ['dist/**/*.subscriber{.ts,.js}'],
    migrations: [join(__dirname, './migrations/*{.ts,.js}')],
    idleTimeout: 60000,
    extra: {
      connectionLimit: 10,
    },
  }),
};
